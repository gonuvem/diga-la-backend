/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import Factory from '../../../factories'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import {
  UserDocument,
  UserInterface,
  ClientDocument
} from '../../../interfaces'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { UpdateClientInput } from '../../../types'
import * as gqlInputs from '../../gqlInputs'

const resolver = 'updateClient'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createInput = gqlInputs.createInputUpdateClient

const createQuery = ({ id, input }: { id: string, input: UpdateClientInput })
: string => `
mutation {
  ${resolver}(id: "${id}", input: ${createInput(input)}) {
    client ${gqlFieldsQuery.clientFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: any, received: any): void => {
  checkObjects.checkClient(expected, received)
  expect(received).toMatchObject({
    _id: expected._id.toString()
  })
}

const createFakeBody = (userBody = {}, clientBody = {}): UserInterface => {
  const user = Factory.build<UserDocument>('User',
    { roles: [Role.Client], ...userBody })

  return { ...user }
}

type Ents = { objects: ClientDocument[] }
const createEnts = async (): Promise<Ents> => {
  const u1 = await helpers.createUser({ body: { roles: [Role.Client] } })

  const u2 = await helpers.createUser({ body: { roles: [Role.Client] } })

  const o1 = await helpers.createClient({ body: { user: u1._id } })
  const o2 = await helpers.createClient({ body: { user: u2._id } })

  o1.user = u1
  o2.user = u2

  const objects = [o1, o2]

  return { objects }
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const body = createFakeBody()
  utils.testIsGqlAuthenticated(app, resolver, createQuery({ id: fakeId, input: body }))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Dev
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

  test('404 Client not found - no client', async () => {
    const body = createFakeBody()

    return baseRequest({ id: fakeId, input: body }, setupData.dev.token)
      .then(utils.expectGqlError(err.CLIENT_NOT_FOUND, resolver))
  })

  let ents: Ents
  test('404 Client not found - wrong id', async () => {
    ents = await createEnts()
    const body = createFakeBody()
    return baseRequest({ id: fakeId, input: body }, setupData.dev.token)
      .then(utils.expectGqlError(err.CLIENT_NOT_FOUND, resolver))
  })

  const userConflictTests = [
    { uniqueField: 'email', error: err.EMAIL_CONFLICT }
  ]
  for (const { uniqueField, error } of userConflictTests) {
    test(`409 User conflict - same ${uniqueField}`, async () => {
      const id = ents.objects[0]._id.toString()

      const userBody = {
        [uniqueField]: setupData.dev.fact[uniqueField as keyof UserInterface]
      }

      const body = createFakeBody(userBody)

      return baseRequest({ id, input: body }, setupData.dev.token)
        .then(utils.expectGqlError(error, resolver))
    })
  }

  test('200 Client updated', async () => {
    const id = ents.objects[0]._id.toString()

    const body = createFakeBody()

    return baseRequest({ id, input: body }, setupData.dev.token)
      .then(response => {
        // utils.printForDocs(response.body)
        const { client, error } = response.body.data[resolver]
        expect(error).toBe(null)
        const { ...user } = body
        const expected = { _id: id, user }
        checkResponse(expected, client)
      })
  })

  afterAll(async () => {
    await helpers.dropCollections(['User', 'Client'])
  })
}
