/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import { ForgotPasswordParams } from '../../../types'

const resolver = 'forgotPassword'

// eslint-disable-next-line max-lines-per-function
const createQuery = ({ email }: ForgotPasswordParams): string => `
mutation {
  ${resolver}(email: "${email}") {
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const baseRequest = utils.baseGqlRequest(app, createQuery)

export default (): void => {
  test('404 User not found', () => {
    return baseRequest({ email: 'email@email.com' })
      .then(utils.expectGqlError(err.USER_NOT_FOUND, resolver))
  })

  test.skip('200 Email sent', async () => {
    // Modifique essas variáveis em jest.config.js antes de testar
    // process.env.SG_API_KEY = ''
    // process.env.CONTACT_EMAIL = ''

    // Crie um email temporário em https://www.tempmailaddress.com/
    const email = 'zeke.abshir@andyes.net'

    const user = await helpers.createUser({ body: { email } })

    return baseRequest({ email: user.email })
      .then(response => {
        utils.printForDocs(response.body)
        const { error } = response.body.data[resolver]
        expect(error).toBeNull()
      })
  }, 10000)

  afterAll(async () => {
    await helpers.dropCollection({ modelName: 'User' })
  })
}
