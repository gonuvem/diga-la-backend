/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import Factory from '../../../factories'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import { FormInterface, FormDocument } from '../../../interfaces'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import * as gqlInputs from '../../gqlInputs'
import { CreateOwnFormInput } from '../../../types'

const resolver = 'createOwnForm'

let setupData: helpers.SetupTaskResult

const createInput = gqlInputs.createInputCreateOwnForm

const createQuery = (input: CreateOwnFormInput): string => `
mutation {
  ${resolver}(input: ${createInput(input)}) {
    form ${gqlFieldsQuery.formFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = checkObjects.checkForm

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const body = Factory.build<FormInterface>('Form')
  utils.testIsGqlAuthenticated(app, resolver, createQuery(body))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client
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

  test('200 Form created', async () => {
    const body = Factory.build<FormInterface>('Form')

    const user = setupData.client.user

    const client = await helpers.createClient({ body: { user: user._id } })

    return baseRequest(body, setupData.client.token)
      .then(response => {
        const { form } = response.body.data[resolver] as { form: FormDocument }

        const expected = { ...body, client: { ...client, user } }

        checkResponse(expected, form)
      })
  })

  afterAll(async () => {
    await helpers.dropCollections(['User', 'Form', 'Client'])
  })
}
