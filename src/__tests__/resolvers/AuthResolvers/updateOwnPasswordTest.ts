/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { UpdateOwnPasswordParams } from '../../../types'

const resolver = 'updateOwnPassword'

let setupData: helpers.SetupTaskResult

const createQuery = ({ oldPassword, newPassword }: UpdateOwnPasswordParams)
: string => `
mutation {
  ${resolver}(oldPassword: "${oldPassword}", newPassword: "${newPassword}") {
    user ${gqlFieldsQuery.userFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = checkObjects.checkUser

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const body = { oldPassword: '123456', newPassword: '654321' }
  utils.testIsGqlAuthenticated(app, resolver, createQuery(body))

  test('422 Password incorrect', () => {
    return baseRequest(body, setupData.dev.token)
      .then(utils.expectGqlError(err.PASSWORD_INCORRECT, resolver))
  })

  test('200 Password updated', () => {
    const body = {
      oldPassword: setupData.dev.fact.password,
      newPassword: '123456'
    }
    return baseRequest(body, setupData.dev.token)
      .then(response => {
        const { error, user } = response.body.data[resolver]
        expect(error).toBeNull()
        checkResponse(setupData.dev.fact, user)
      })
  })

  test('422 Password incorrect - already updated', () => {
    const body = {
      oldPassword: setupData.dev.fact.password,
      newPassword: '123456'
    }
    return baseRequest(body, setupData.dev.token)
      .then(utils.expectGqlError(err.PASSWORD_INCORRECT, resolver))
  })

  test('200 Password updated - again', () => {
    const body = {
      oldPassword: '123456',
      newPassword: '654321'
    }
    return baseRequest(body, setupData.dev.token)
      .then(response => {
        // utils.printForDocs(response.body)
        const { error, user } = response.body.data[resolver]
        expect(error).toBeNull()
        checkResponse(setupData.dev.fact, user)
      })
  })

  afterAll(async () => {
    await helpers.dropCollections(['User'])
  })
}
