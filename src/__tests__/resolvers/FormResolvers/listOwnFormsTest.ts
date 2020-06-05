/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { FormDocument } from '../../../interfaces'
import { ListFormsResponse } from '../../../types'

const resolver = 'listOwnForms'

let setupData: helpers.SetupTaskResult

const createQuery = ({ page = 0, perPage = 5, sort = '-createdAt', rest = '' })
: string => `
query {
  ${resolver}(page: ${page}, perPage: ${perPage}, sort: "${sort}"${rest}) {
    forms ${gqlFieldsQuery.formFieldsQuery}
    total
    pages
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const baseResponseExpected = utils.baseGqlListResponseExpected('forms',
  resolver)

const createForm = helpers.createForm
const createUser = helpers.createUser
const createClient = helpers.createClient
const createResponse = helpers.createResponse

type Ents = { objects: FormDocument[], token: string }
const createEnts = async (): Promise<Ents> => {
  const { token, client, user } = await helpers.createClientUserAndToken()

  client.user = user

  const [u1, u2, u3] = await Promise.all([
    createUser({
      body: {
        roles: [Role.Client],
        name: 'Joaquim Xavier',
        email: 'joaquim@gmail.com'
      }
    }),
    createUser({
      body: {
        roles: [Role.Client],
        name: 'Maria Clara',
        email: 'maria@hotmail.com'
      }
    }),
    createUser({
      body: {
        roles: [Role.Client],
        name: 'Francisco Gomes',
        email: 'gomes@yahoo.com'
      }
    })
  ])

  const [s1, s2, s3] = await Promise.all([
    createClient({ body: { user: u1._id } }),
    createClient({ body: { user: u2._id } }),
    createClient({ body: { user: u3._id } })
  ])

  const o1 = await createForm({ body: { client: client._id } })
  s1.user = u1
  o1.client = client

  const o2 = await createForm({ body: { client: client._id } })
  s2.user = u2
  o2.client = client

  const o3 = await createForm({ body: { client: client._id } })
  s3.user = u3
  o3.client = client

  await Promise.all([
    createResponse({ body: { form: o1._id }, size: 3 }),
    createResponse({ body: { form: o2._id }, size: 7 }),
    createResponse({ body: { form: o3._id }, size: 1 })
  ])

  o1.numResponses = 3
  o2.numResponses = 7
  o3.numResponses = 1

  const objects = [o1, o2, o3]

  return { objects, token }
}

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: FormDocument, received: FormDocument)
: void => {
  checkObjects.checkForm(expected, received)
  expect(received).toMatchObject({
    _id: expected._id.toString(),
    createdAt: expected.createdAt.toISOString(),
    updatedAt: expected.updatedAt.toISOString(),
    numResponses: expected.numResponses
  })
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  utils.testIsGqlAuthenticated(app, resolver, createQuery({}))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client
  ])

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest({}, setupData[role].token)
        .then(utils.expectGqlError(err.USER_NOT_ALLOWED, resolver))
    })
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest({}, setupData[role].token)
        .then(response => {
          expect(response.status).not.toBe(403)
        })
    })
  }

  test('404 Forms empty list', async () => {
    const { token } = await helpers.createClientUserAndToken()

    return baseRequest({}, token)
      .then(utils.expectGqlError(err.FORMS_EMPTY_LIST, resolver))
  })

  let ents: Ents
  test('200 Forms found', async () => {
    ents = await createEnts()
    return baseRequest({}, ents.token)
      .then(response => {
        // utils.printForDocs(response.body)
        baseResponseExpected(response)
      })
  })

  const sortTests = [
    {
      sort: '-createdAt',
      func: (a: any, b: any): number => utils.sortByDateDesc(a.createdAt,
        b.createdAt)
    },
    {
      sort: 'createdAt',
      func: (a: any, b: any): number => utils.sortByDateAsc(a.createdAt,
        b.createdAt)
    },
    {
      sort: '-config.name',
      func: (a: any, b: any): number => utils.sortByStringDesc(a.config.name,
        b.config.name)
    },
    {
      sort: 'config.name',
      func: (a: any, b: any): number => utils.sortByStringAsc(a.config.name,
        b.config.name)
    }
  ]
  const defaultSort = sortTests[0]
  for (const t of sortTests) {
    test(`200 Forms found - test sort by ${t.sort}`, () => {
      const sorted = ents.objects.sort(t.func)
      return baseRequest({ sort: t.sort }, ents.token)
        .then(response => {
          baseResponseExpected(response)
          const { forms } = response.body.data[resolver] as ListFormsResponse
          forms.forEach((obj, i) => {
            checkResponse(sorted[i], obj)
          })
        })
    })
  }

  test('200 Forms found - test paginate', () => {
    const sorted = ents.objects.sort(defaultSort.func)
    return baseRequest({ page: 1, perPage: 2 }, ents.token)
      .then(response => {
        baseResponseExpected(response, 3, 2)
        const { forms } = response.body.data[resolver] as ListFormsResponse
        forms.forEach((obj, i) => {
          checkResponse(sorted[i + 2], obj)
        })
      })
  })

  afterAll(async () => {
    await helpers.dropCollections(['Form', 'Response', 'User', 'Client'])
  })
}
