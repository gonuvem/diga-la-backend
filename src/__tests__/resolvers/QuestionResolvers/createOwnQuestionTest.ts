/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import Factory from '../../../factories'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import {
  QuestionDocument,
  FormDocument,
  QuestionTypeDocument
} from '../../../interfaces'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import * as gqlInputs from '../../gqlInputs'
import { CreateOwnQuestionInput } from '../../../types'

const resolver = 'createOwnQuestion'

let setupData: helpers.SetupTaskResult

const createInput = gqlInputs.createInputCreateOwnQuestion

const createQuery = (input: CreateOwnQuestionInput): string => `
mutation {
  ${resolver}(input: ${createInput(input)}) {
    question ${gqlFieldsQuery.questionFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = checkObjects.checkQuestion

type Ents = { form: FormDocument, type: QuestionTypeDocument, token: string }
const createEnts = async (): Promise<Ents> => {
  const { client, user, token } = await helpers.createClientUserAndToken()

  const [form, type] = await Promise.all([
    helpers.createForm({ body: { client: client._id } }),
    helpers.createQuestionType({})
  ])

  client.user = user

  form.client = client

  return { form, type, token }
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const body = Factory.build<CreateOwnQuestionInput>('Question')
  utils.testIsGqlAuthenticated(app, resolver,
    createQuery(body as CreateOwnQuestionInput))

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

  let ents: Ents
  test('404 Form not found', async () => {
    ents = await createEnts()

    const body = Factory.build<CreateOwnQuestionInput>('Question', {
      type: ents.type._id
    })

    return baseRequest(body, ents.token)
      .then(utils.expectGqlError(err.FORM_NOT_FOUND, resolver))
  })

  test('404 Question Type not found', () => {
    const body = Factory.build<CreateOwnQuestionInput>('Question', {
      form: ents.form._id
    })

    return baseRequest(body, ents.token)
      .then(utils.expectGqlError(err.QUESTION_TYPE_NOT_FOUND, resolver))
  })

  test('200 Question created', () => {
    const { form, type, token } = ents

    const body = Factory.build<CreateOwnQuestionInput>('Question', {
      form: form._id,
      type: type._id
    })

    return baseRequest(body, token)
      .then(response => {
        // utils.printForDocs(response)
        const { question } = response.body.data[resolver] as {
           question: QuestionDocument }

        const expected = { ...body, form, type, position: 0 }

        checkResponse(expected, question)
      })
  })

  afterAll(async () => {
    await helpers.dropCollections(
      ['User', 'Question', 'Client', 'Form', 'QuestionType'])
  })
}
