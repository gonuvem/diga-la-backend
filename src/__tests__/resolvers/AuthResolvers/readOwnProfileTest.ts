/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { ClientDocument } from '../../../interfaces'

const resolver = 'readOwnProfile'

let setupData: helpers.SetupTaskResult

const createQuery = (): string => `
query {
  ${resolver} {
    client ${gqlFieldsQuery.clientFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

type Ents = { objects: ClientDocument[], tokens: string[] }
const createEnts = async (): Promise<Ents> => {
  const u1 = await helpers.createUser({
    body: {
      roles: [Role.Client],
      name: 'Joaquim Xavier',
      email: 'joaquim@gmail.com'
    }
  })
  const o1 = await helpers.createClient({ body: { user: u1._id } })
  const tk1 = await helpers.getToken(u1)

  const u2 = await helpers.createUser({
    body: {
      roles: [Role.Client],
      name: 'Maria Clara',
      email: 'maria@hotmail.com'
    }
  })
  const o2 = await helpers.createClient({ body: { user: u2._id } })
  const tk2 = await helpers.getToken(u2)

  const u3 = await helpers.createUser({
    body: {
      roles: [Role.Client],
      name: 'Francisco Gomes',
      email: 'gomes@yahoo.com'
    }
  })
  const o3 = await helpers.createClient({ body: { user: u3._id } })
  const tk3 = await helpers.getToken(u3)

  o1.user = u1
  o2.user = u2
  o3.user = u3

  const objects = [o1, o2, o3]

  return { objects, tokens: [tk1, tk2, tk3] }
}

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: any, received: any)
: void => {
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

  utils.testIsGqlAuthenticated(app, resolver, createQuery())

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client
  ])

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest({}, setupData[role].token)
        .then(utils.expectGqlError(err.USER_NOT_ALLOWED, resolver))
    })
  }

  let ents: Ents
  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, async () => {
      ents = await createEnts()
      return baseRequest({}, setupData[role].token)
        .then(response => {
          expect(response.status).not.toBe(403)
        })
    })
  }

  for (let i = 0; i < 3; i++) {
    test(`200 Client found - client #${i + 1}`, () => {
      const expected = ents.objects[i]
      return baseRequest({}, ents.tokens[i])
        .then(response => {
          // utils.printForDocs(response.body)
          const { client, error } = response.body.data[resolver]
          expect(error).toBeNull()
          checkResponse(expected, client)
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(['Client', 'User'])
  })
}
