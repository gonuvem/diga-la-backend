/* eslint-disable max-lines-per-function */
import Factory from '../../../factories'
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { UserInterface, UserDocument, ClientDocument } from '../../../interfaces'
import { LoginParams, LoginResponse } from '../../../types'

const resolver = 'login'

// eslint-disable-next-line max-lines-per-function
const createQuery = ({ email, password }: LoginParams)
: string => `
mutation {
  ${resolver}(email: "${email}", password: "${password}") {
    token
    info {
      _id
      user ${gqlFieldsQuery.userFieldsQuery}
    }
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const baseRequest = utils.baseGqlRequest(app, createQuery)

type Ents = { dev: { user: Partial<UserDocument> }, client: ClientDocument }

const createEnts = async (): Promise<Ents> => {
  const roles = [[Role.Dev], [Role.Client]]

  const createUserFact = (body: object): UserInterface => Factory
    .build<UserInterface>('User', body)

  const factories = roles.map(role => createUserFact({ roles: role }))

  const users = await Promise.all<UserDocument>(factories
    .map(fact => helpers.createUser({ body: fact })))

  users[0].password = factories[0].password
  users[1].password = factories[1].password

  const dev = { user: users[0] }

  const client = await helpers.createClient({ body: { user: users[1]._id } })
  client.user = users[1]

  return { dev, client }
}

const checkResponse = checkObjects.checkUser

let setupData: helpers.SetupTaskResult
// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  test('404 User not found', () => {
    return baseRequest({ email: 'a@email.com', password: '123abc' })
      .then(utils.expectGqlError(err.USER_NOT_FOUND, resolver))
  })

  let ents: Ents
  test('422 Password incorrect', async () => {
    ents = await createEnts()
    return baseRequest({ email: setupData.dev.fact.email, password: '123abc' })
      .then(utils.expectGqlError(err.PASSWORD_INCORRECT, resolver))
  })

  for (const role of Object.values(Role)) {
    for (const loginMethod of ['email']) {
      test(`200 Login OK for ${role} with ${loginMethod}`, () => {
        const expected = ents[role]

        const { password, email } = expected.user

        return baseRequest({ email, password })
          .then(response => {
            // utils.printForDocs(response.body)
            const { token, info }: LoginResponse = response.body.data[resolver]

            expect(token).not.toBeNull()
            role === Role.Dev
              ? expect(info._id).toBeNull()
              : expect(info._id.toString()).toBe(ents.client._id.toString())
            checkResponse(expected.user, info.user)
          })
      })
    }
  }

  afterAll(async () => {
    await helpers.dropCollections(['User', 'Client'])
  })
}
