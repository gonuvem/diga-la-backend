/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import {
  USER_NOT_FOUND,
  WRONG_RENEW_PASSWORD_CODE
} from '../../../middlewares/errorHandling/errors'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import { RenewPasswordParams } from '../../../types'

const resolver = 'renewPassword'

const createQuery = ({ email, password, code }: RenewPasswordParams)
: string => `
mutation {
  ${resolver}(email: "${email}", password: "${password}", code: "${code}") {
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const baseRequest = utils.baseGqlRequest(app, createQuery)

export default (): void => {
  const fakeBody = {
    email: 'email@meal.com',
    password: '123456',
    code: 'abcde'
  }

  test('404 User not found', () => {
    return baseRequest(fakeBody)
      .then(utils.expectGqlError(USER_NOT_FOUND, resolver))
  })

  test('422 Wrong renew password code - no code generated', async () => {
    const user = await helpers.createUser({ })
    const wrongBody = utils.replacePropertyFromObj(
      'email',
      fakeBody,
      user.email
    )
    return baseRequest(wrongBody)
      .then(utils.expectGqlError(WRONG_RENEW_PASSWORD_CODE, resolver))
  })
  test('422 Wrong renew password code - wrong code', async () => {
    const user = await helpers.createUser({
      body: { renewPasswordCode: 'aaaaa' }
    })
    const wrongBody = utils.replacePropertyFromObj(
      'email',
      fakeBody,
      user.email
    )
    return baseRequest(wrongBody)
      .then(utils.expectGqlError(WRONG_RENEW_PASSWORD_CODE, resolver))
  })

  // 2.3 Testar senha atualizada com sucesso
  let body: RenewPasswordParams
  test('201 Password updated', async () => {
    const user = await helpers.createUser({
      body: { renewPasswordCode: fakeBody.code }
    })
    body = {
      email: user.email,
      password: 'novo12',
      code: fakeBody.code
    }
    return baseRequest(body)
      .then(response => {
        // utils.printForDocs(response.body)
        const { error } = response.body.data[resolver]
        expect(error).toBeNull()
      })
  })

  // 2.4 Testar código incorreto - já usado
  test('422 Wrong renew password code - code already used', () => {
    return baseRequest(body)
      .then(utils.expectGqlError(WRONG_RENEW_PASSWORD_CODE, resolver))
  })

  afterAll(async () => {
    await helpers.dropCollection({ modelName: 'User' })
  })
}
