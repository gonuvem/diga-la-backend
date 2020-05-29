/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import Factory from '../../../factories'
import * as err from '../../../middlewares/errorHandling/errors'
import { ResponseInterface, FormDocument, QuestionDocument } from '../../../interfaces'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as gqlInputs from '../../gqlInputs'
import { SubmitResponseInput } from '../../../types'

const resolver = 'submitResponse'

const createInput = gqlInputs.createInputSubmitResponse

const createQuery = (input: SubmitResponseInput): string => `
mutation {
  ${resolver}(input: ${createInput(input)}) {
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const createFakeBody = (body: Partial<ResponseInterface> = {})
: ResponseInterface =>
  Factory.build<ResponseInterface>('Response', body)

type Ents = { form: FormDocument, question: QuestionDocument }
const createEnts = async (): Promise<Ents> => {
  const { client } = await helpers.createClientUserAndToken()
  const form = await helpers.createForm({ body: { client: client._id } })
  const type = await helpers.createQuestionType({})
  const question = await helpers.createQuestion({
    body: { form: form._id, type: type._id }
  })

  return { form, question }
}

export default (): void => {
  let ents: Ents

  test('404 Form not found', async () => {
    ents = await createEnts()
    const body = createFakeBody()

    return baseRequest(body)
      .then(utils.expectGqlError(err.FORM_NOT_FOUND, resolver))
  })

  test('404 Question not found', async () => {
    ents = await createEnts()

    const body = createFakeBody({ form: ents.form._id })

    return baseRequest(body)
      .then(utils.expectGqlError(err.QUESTION_NOT_FOUND, resolver))
  })

  test('200 Response submitted', async () => {
    const { answersAndQuestions } = createFakeBody()
    const { form } = createFakeBody(
      { form: ents.form._id })
    const validAnswers = [{
      question: ents.question._id,
      answer: answersAndQuestions[0].answer
    }]

    const body = { form, answersAndQuestions: validAnswers }

    return baseRequest(body)
      .then(response => {
        // utils.printForDocs(response)
        const { error } = response.body.data[resolver]
        expect(error).toBe(null)
      })
  })

  afterAll(async () => {
    await helpers.dropCollections(
      ['User', 'Response', 'Question', 'QuestionType', 'Response', 'Client']
    )
  })
}
