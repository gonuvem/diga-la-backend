/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { ClientDocument } from '../../../interfaces'
import { ListClientsResponse } from '../../../types'
import { createArgumentRest } from '../../gqlTestHelper'

const resolver = 'listClients'

let setupData: helpers.SetupTaskResult

const createSearchRest = createArgumentRest('q')

const createQuery = ({ page = 0, perPage = 5, sort = 'user.name', rest = '' })
: string => `
query {
  ${resolver}(page: ${page}, perPage: ${perPage}, sort: "${sort}"${rest}) {
    clients ${gqlFieldsQuery.clientFieldsQuery}
    total
    pages
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const baseResponseExpected = utils.baseGqlListResponseExpected('clients',
  resolver)

type Ents = { objects: ClientDocument[] }
const createEnts = async (): Promise<Ents> => {
  const u1 = await helpers.createUser({
    body: {
      roles: [Role.Client],
      name: 'Joaquim Xavier',
      email: 'joaquim@gmail.com'
    }
  })
  const o1 = await helpers.createClient({ body: { user: u1._id } })

  const u2 = await helpers.createUser({
    body: {
      roles: [Role.Client],
      name: 'Maria Clara',
      email: 'maria@hotmail.com'
    }
  })
  const o2 = await helpers.createClient({ body: { user: u2._id } })

  const u3 = await helpers.createUser({
    body: {
      roles: [Role.Client],
      name: 'Francisco Gomes',
      email: 'gomes@yahoo.com'
    }
  })
  const o3 = await helpers.createClient({ body: { user: u3._id } })

  o1.user = u1
  o2.user = u2
  o3.user = u3

  const objects = [o1, o2, o3]

  return { objects }
}

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: any, received: any): void => {
  checkObjects.checkClient(expected, received)
  expect(received).toMatchObject({
    _id: expected._id.toString(),
    createdAt: expected.createdAt.toISOString(),
    updatedAt: expected.updatedAt.toISOString()
  })
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  utils.testIsGqlAuthenticated(app, resolver, createQuery({}))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Dev
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

  test('404 Clients empty list', () => {
    return baseRequest({}, setupData.dev.token)
      .then(utils.expectGqlError(err.CLIENTS_EMPTY_LIST, resolver))
  })

  let ents: Ents
  test('200 Clients found', async () => {
    ents = await createEnts()
    return baseRequest({}, setupData.dev.token)
      .then(response => {
        // utils.printForDocs(response)
        baseResponseExpected(response)
      })
  })

  const sortTests = [
    {
      sort: '-createdAt',
      func: (a: any, b: any): number => utils.sortByDateDesc(a.createdAt, b.createdAt)
    },
    {
      sort: 'createdAt',
      func: (a: any, b: any): number => utils.sortByDateAsc(a.createdAt, b.createdAt)
    },
    {
      sort: '-user.name',
      func: (a: any, b: any): number => utils.sortByStringDesc(a.user.name, b.user.name)
    },
    {
      sort: 'user.name',
      func: (a: any, b: any): number => utils.sortByStringAsc(a.user.name, b.user.name)
    }
  ]
  const defaultSort = sortTests[3]
  for (const t of sortTests) {
    test(`200 Clients found - test sort by ${t.sort}`, () => {
      const sorted = ents.objects.sort(t.func)
      return baseRequest({ sort: t.sort }, setupData.dev.token)
        .then(response => {
          baseResponseExpected(response)
          const { clients } = response.body.data[resolver] as ListClientsResponse
          clients.forEach((obj, i) => {
            checkResponse(sorted[i], obj)
          })
        })
    })
  }

  test('200 Clients found - test paginate', () => {
    const sorted = ents.objects.sort(defaultSort.func)
    return baseRequest({ page: 1, perPage: 2 }, setupData.dev.token)
      .then(response => {
        baseResponseExpected(response, 3, 2)
        const { clients } = response.body.data[resolver] as ListClientsResponse
        clients.forEach((obj, i) => {
          checkResponse(sorted[i + 2], obj)
        })
      })
  })

  const searchTests = [
    { field: 'user.name', q: 'Joaquim' },
    { field: 'user.email', q: 'gmail' },
    { field: 'user.name', q: 'Maria' },
    { field: 'user.email', q: 'hotmail' },
    { field: 'user.name', q: 'Gomes' },
    { field: 'user.email', q: 'yahoo' }
  ]
  for (const { field, q } of searchTests) {
    test(`200 Clients found - search by ${field} with q=${q}`, () => {
      const rest = createSearchRest(q)

      const [f1, f2] = field.split('.')

      const expected = ents.objects
        .filter((o: any) => o[f1][f2].search(q) !== -1)
        .sort(defaultSort.func)
      return baseRequest({ rest }, setupData.dev.token)
        .then(response => {
          baseResponseExpected(response, expected.length, 1)
          const { clients } = response.body.data[resolver] as ListClientsResponse
          clients.forEach((obj, i) => {
            checkResponse(expected[i], obj)
          })
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(['Client', 'User'])
  })
}
