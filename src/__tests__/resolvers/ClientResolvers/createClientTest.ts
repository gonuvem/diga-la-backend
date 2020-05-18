/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import Factory from '../../../factories'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import { UserDocument, UserInterface } from '../../../interfaces'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import * as gqlInputs from '../../gqlInputs'
import { CreateClientInput } from '../../../types'

const resolver = 'createClient'

let setupData: helpers.SetupTaskResult

const createInput = gqlInputs.createInputCreateClient

const createQuery = (input: CreateClientInput): string => `
mutation {
  ${resolver}(input: ${createInput(input)}) {
    client ${gqlFieldsQuery.clientFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const createFakeBody = (userBody = {}, clientBody = {}): UserInterface => {
  const user = Factory.build<UserDocument>('User',
    { roles: [Role.Client], ...userBody })

  return { ...user }
}

const checkResponse = checkObjects.checkClient

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const body = createFakeBody()
  utils.testIsGqlAuthenticated(app, resolver, createQuery(body))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Dev
  ])

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest(body, setupData[role].token)
        .then(utils.expectGqlError(err.USER_NOT_ALLOWED, resolver))
    })
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest(body, setupData[role].token)
        .then(response => {
          expect(response.status).not.toBe(403)
        })
    })
  }

  const userConflictTests = [
    { uniqueField: 'email', error: err.EMAIL_CONFLICT }
  ]
  for (const { uniqueField, error } of userConflictTests) {
    test(`409 User conflict - same ${uniqueField}`, async () => {
      const userBody = {
        [uniqueField]: setupData.dev.fact[uniqueField as keyof UserInterface]
      }

      const body = createFakeBody(userBody)

      return baseRequest(body, setupData.dev.token)
        .then(utils.expectGqlError(error, resolver))
    })
  }

  test('200 Client created', async () => {
    const body = createFakeBody()

    return baseRequest(body, setupData.dev.token)
      .then(response => {
        // utils.printForDocs(response)
        const { client, error } = response.body.data[resolver]
        expect(error).toBe(null)
        const { ...user } = body

        const expected = { user }

        checkResponse(expected, client)
      })
  })

  afterAll(async () => {
    await helpers.dropCollections(['User', 'Client'])
  })
}
