/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import * as gqlInputs from '../../gqlInputs'
import Factory from '../../../factories'
import { UserInterface, ClientDocument } from '../../../interfaces'
import { UpdateOwnProfileInput } from '../../../types'

const resolver = 'updateOwnProfile'

let setupData: helpers.SetupTaskResult

const createInput = gqlInputs.createInputUpdateOwnProfile

const createQuery = ({ input }: { input: UpdateOwnProfileInput }): string => `
mutation {
  ${resolver}(input: ${createInput(input)}) {
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

const createFakeBody = (userBody = {}, _clientBody = {}): UserInterface => {
  const user = Factory.build<UserInterface>('User',
    { roles: [Role.Client], ...userBody })

  return { ...user }
}

type Ents = { objects: ClientDocument[], tokens: string[] }
const createEnts = async (): Promise<Ents> => {
  const u1 = await helpers.createUser({ body: { roles: [Role.Client] } })
  const tk1 = await helpers.getToken(u1)

  const u2 = await helpers.createUser({ body: { roles: [Role.Client] } })
  const tk2 = await helpers.getToken(u2)

  const o1 = await helpers.createClient({ body: { user: u1._id } })
  const o2 = await helpers.createClient({ body: { user: u2._id } })

  o1.user = u1
  o2.user = u2

  const objects = [o1, o2]

  return { objects, tokens: [tk1, tk2] }
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const body = createFakeBody()
  utils.testIsGqlAuthenticated(app, resolver, createQuery({ input: body }))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client
  ])

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest({ input: body }, setupData[role].token)
        .then(utils.expectGqlError(err.USER_NOT_ALLOWED, resolver))
    })
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest({ input: body }, setupData[role].token)
        .then(response => {
          expect(response.status).not.toBe(403)
        })
    })
  }

  let ents: Ents
  const userConflictTests = [
    { uniqueField: 'email', error: err.EMAIL_CONFLICT }
  ]
  for (const { uniqueField, error } of userConflictTests) {
    test(`409 User conflict - same ${uniqueField}`, async () => {
      ents = await createEnts()

      const userBody = {
        [uniqueField]: setupData.dev.fact[uniqueField as keyof UserInterface]
      }

      const body = createFakeBody(userBody)

      return baseRequest({ input: body }, ents.tokens[0])
        .then(utils.expectGqlError(error, resolver))
    })
  }

  test('200 Client updated', async () => {
    const id = ents.objects[0]._id.toString()
    const body = createFakeBody({})

    return baseRequest({ input: body }, ents.tokens[0])
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
