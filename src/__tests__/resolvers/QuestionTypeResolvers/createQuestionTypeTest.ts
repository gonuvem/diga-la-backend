/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import Factory from '../../../factories'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import { QuestionTypeInterface } from '../../../interfaces'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import * as gqlInputs from '../../gqlInputs'
import { CreateQuestionTypeInput } from '../../../types'

const resolver = 'createQuestionType'

let setupData: helpers.SetupTaskResult

const createInput = gqlInputs.createInputCreateQuestionType

const createQuery = (input: CreateQuestionTypeInput): string => `
mutation {
  ${resolver}(input: ${createInput(input)}) {
    type ${gqlFieldsQuery.questionTypeFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = checkObjects.checkQuestionType

const createFakeBody = (body: Partial<QuestionTypeInterface> = {})
: QuestionTypeInterface =>
  Factory.build<QuestionTypeInterface>('QuestionType', body)

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

  test('409 QuestionType conflict - same alias', async () => {
    const type = await helpers.createQuestionType({})

    const body = createFakeBody({ alias: type.alias })

    return baseRequest(body, setupData.dev.token)
      .then(utils.expectGqlError(err.ALIAS_CONFLICT, resolver))
  })

  test('200 QuestionType created', async () => {
    await helpers.dropCollection({ modelName: 'QuestionType' })

    const body = createFakeBody()

    return baseRequest(body, setupData.dev.token)
      .then(response => {
        // utils.printForDocs(response)
        const { type, error } = response.body.data[resolver]
        expect(error).toBe(null)

        checkResponse(body, type)
      })
  })

  afterAll(async () => {
    await helpers.dropCollections(['User', 'QuestionType'])
  })
}
