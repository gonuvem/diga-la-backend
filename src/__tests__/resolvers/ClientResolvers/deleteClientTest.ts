/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import { ClientDocument } from '../../../interfaces'

const resolver = 'deleteClient'

let setupData: helpers.SetupTaskResult

// eslint-disable-next-line max-lines-per-function
const createQuery = ({ id }: { id: string }): string => `
mutation {
  ${resolver}(id: "${id}") {
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const fakeId = Types.ObjectId().toHexString()

type Ents = { objects: ClientDocument[] }
const createEnts = async (): Promise<Ents> => {
  const u1 = await helpers.createUser({ body: { roles: [Role.Client] } })
  const o1 = await helpers.createClient({ body: { user: u1._id } })

  const u2 = await helpers.createUser({ body: { roles: [Role.Client] } })
  const o2 = await helpers.createClient({ body: { user: u2._id } })

  const o3 = await helpers.createClient({})

  await helpers.createForm({ body: { client: o2._id } })

  const objects = [o1, o2, o3]

  return { objects }
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  utils.testIsGqlAuthenticated(app, resolver, createQuery({ id: fakeId }))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Dev
  ])

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest({ id: fakeId }, setupData[role].token)
        .then(utils.expectGqlError(err.USER_NOT_ALLOWED, resolver))
    })
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest({ id: fakeId }, setupData[role].token)
        .then(response => {
          expect(response.status).not.toBe(403)
        })
    })
  }

  let ents: Ents
  test('404 Client not found', async () => {
    ents = await createEnts()
    return baseRequest({ id: fakeId }, setupData.dev.token)
      .then(utils.expectGqlError(err.CLIENT_NOT_FOUND, resolver))
  })

  test('422 Client in use', async () => {
    const id = ents.objects[1]._id
    return baseRequest({ id }, setupData.dev.token)
      .then(utils.expectGqlError(err.CLIENT_IN_USE, resolver))
  })

  test('200 Client deleted', () => {
    const id = ents.objects[0]._id
    return baseRequest({ id }, setupData.dev.token)
      .then(response => {
        // utils.printForDocs(response.body)
        const { error } = response.body.data[resolver]
        expect(error).toBe(null)
      })
  })

  test('404 Client not found - already deleted', async () => {
    const id = ents.objects[0]._id
    return baseRequest({ id }, setupData.dev.token)
      .then(utils.expectGqlError(err.CLIENT_NOT_FOUND, resolver))
  })

  afterAll(async () => {
    await helpers.dropCollections(['Client', 'User'])
  })
}
