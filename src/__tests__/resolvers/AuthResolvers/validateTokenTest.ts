import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import { ValidateTokenParams } from '../../../types'

const resolver = 'validateToken'
let setupData: helpers.SetupTaskResult

// eslint-disable-next-line max-lines-per-function
const createQuery = ({ token }: ValidateTokenParams): string => `
mutation {
  ${resolver}(token: "${token}") {
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const baseRequest = utils.baseGqlRequest(app, createQuery)

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  test('403 Invalid token - token format', () => {
    return baseRequest({ token: utils.unregisteredToken })
      .then(utils.expectGqlError(err.INVALID_TOKEN, resolver))
  })

  test('403 Invalid token - not token format', () => {
    return baseRequest({ token: 'oi' })
      .then(utils.expectGqlError(err.INVALID_TOKEN, resolver))
  })

  for (const role of Object.values(Role)) {
    test(`200 Token is valid for ${role}`, () => {
      return baseRequest({ token: setupData[role].token })
        .then(response => {
          // utils.printForDocs(response.body)
          const { error } = response.body.data[resolver]
          expect(error).toBeNull()
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollection({ modelName: 'User' })
  })
}
