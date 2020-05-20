/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import Factory from '../../../factories'
import * as gqlInputs from '../../gqlInputs'
import { FormInterface, FormDocument } from '../../../interfaces'
import { UpdateOwnFormInput } from '../../../types'

const resolver = 'updateOwnForm'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createInput = gqlInputs.createInputUpdateOwnForm

const createQuery = ({ id, input }: { id: string, input: UpdateOwnFormInput })
: string => `
mutation {
  ${resolver}(id: "${id}", input: ${createInput(input)}) {
    form ${gqlFieldsQuery.formFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const createForm = helpers.createForm
const createUser = helpers.createUser
const createClient = helpers.createClient

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

  const o1 = await createForm({
    body: {
      client: client._id
    }
  })

  s1.user = u1
  o1.client = client

  const o2 = await createForm({
    body: {
      client: client._id
    }
  })
  s2.user = u2
  o2.client = client

  const o3 = await createForm({
    body: {
      client: client._id

    }
  })
  s3.user = u3
  o3.client = client

  const objects = [o1, o2, o3]

  return { objects, token }
}

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: any, received: any): void => {
  checkObjects.checkForm(expected, received)
  expect(received).toMatchObject({
    _id: expected._id.toString(),
    createdAt: expected.createdAt.toISOString()
  })
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const body = Factory.build<object>('Form')

  utils.testIsGqlAuthenticated(app, resolver,
    createQuery({ id: fakeId, input: body }))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client
  ])

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest({ id: fakeId, input: body }, setupData[role].token)
        .then(utils.expectGqlError(err.USER_NOT_ALLOWED, resolver))
    })
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest({ id: fakeId, input: body }, setupData[role].token)
        .then(response => {
          expect(response.status).not.toBe(403)
        })
    })
  }

  test('404 Form not found - no form', async () => {
    const { token } = await helpers.createClientUserAndToken()

    return baseRequest({ id: fakeId, input: body }, token)
      .then(utils.expectGqlError(err.FORM_NOT_FOUND, resolver))
  })

  let ents: Ents
  test('404 Form not found - wrong id', async () => {
    ents = await createEnts()

    return baseRequest({ id: fakeId, input: body }, ents.token)
      .then(utils.expectGqlError(err.FORM_NOT_FOUND, resolver))
  })

  for (let i = 0; i < 3; i++) {
    test(`200 Form updated - form #${i + 1}`, () => {
      const baseForm = ents.objects[i]

      const id = baseForm._id.toString()

      const { client, ...body } = Factory.build<FormInterface>('Form')

      return baseRequest({ id, input: body }, ents.token)
        .then(response => {
          // utils.printForDocs(response.body)
          const { form, error } = response.body.data[resolver]
          expect(error).toBeNull()

          const expected = { ...baseForm.toJSON(), ...body }
          checkResponse(expected, form)
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(['Form', 'User', 'Client'])
  })
}
