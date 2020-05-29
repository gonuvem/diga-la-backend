/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import {
  ResponseDocument,
  FormDocument,
  QuestionDocument
} from '../../../interfaces'
import { ListResponsesResponse } from '../../../types'
import {
  createArgumentRest,
  createStringValue
} from '../../gqlTestHelper'

const resolver = 'listOwnResponses'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createFormRest = createArgumentRest('form', createStringValue)

const createQuestionRest = createArgumentRest('question', createStringValue)

const createQuery = ({ page = 0, perPage = 5, sort = '-createdAt', rest = '' })
: string => `
query {
  ${resolver}(page: ${page}, perPage: ${perPage}, sort: "${sort}"${rest}) {
    responses ${gqlFieldsQuery.responseFieldsQuery}
    total
    pages
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const baseResponseExpected = utils.baseGqlListResponseExpected('responses',
  resolver)

const createResponse = helpers.createResponse

type Ents = {
  token: string,
  objectsByForm: ResponseDocument[]
}
const createEnts = async (): Promise<Ents> => {
  const { token, client, user } = await helpers.createClientUserAndToken()
  client.user = user

  const [form1, form2, form3, type] = await Promise.all([
    helpers.createForm({ body: { client: client._id } }),
    helpers.createForm({ body: { client: client._id } }),
    helpers.createForm({ body: { client: client._id } }),
    helpers.createQuestionType({})
  ])
  form1.client = client
  form2.client = client
  form3.client = client

  const [question1, question2, question3] = await Promise.all([
    helpers.createQuestion({ body: { form: form1._id, type: type._id } }),
    helpers.createQuestion({ body: { form: form1._id, type: type._id } }),
    helpers.createQuestion({ body: { form: form1._id, type: type._id } })
  ])
  question1.form = form1
  question2.form = form1
  question3.form = form1

  question1.type = type
  question2.type = type
  question3.type = type

  const o1 = await createResponse({
    body: {
      form: form1._id,
      answersAndQuestions: [
        { answer: { shortText: 'Sim' }, question: question1._id }
      ]
    }
  })
  o1.form = form1
  o1.answersAndQuestions[0].question = question1

  const o11 = await createResponse({
    body: {
      form: form1._id,
      answersAndQuestions: [
        { answer: { shortText: 'Não' }, question: question2._id }
      ]
    }
  })
  o11.form = form1
  o11.answersAndQuestions[0].question = question2

  const o12 = await createResponse({
    body: {
      form: form1._id,
      answersAndQuestions: [
        { answer: { shortText: 'Talvez' }, question: question3._id }
      ]
    }
  })
  o12.form = form1
  o12.answersAndQuestions[0].question = question3

  return { token, objectsByForm: [o1, o11, o12] }
}

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: any, received: any): void => {
  checkObjects.checkResponse(expected, received)
  expect(received).toMatchObject({
    _id: expected._id.toString(),
    createdAt: expected.createdAt.toISOString(),
    updatedAt: expected.updatedAt.toISOString()
  })
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const rest = createFormRest(fakeId)

  utils.testIsGqlAuthenticated(app, resolver, createQuery({ rest }))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client
  ])

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest({ rest }, setupData[role].token)
        .then(utils.expectGqlError(err.USER_NOT_ALLOWED, resolver))
    })
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest({ rest }, setupData[role].token)
        .then(response => {
          expect(response.status).not.toBe(403)
        })
    })
  }

  test('404 Responses empty list', async () => {
    const { token } = await helpers.createClientUserAndToken()

    return baseRequest({ rest }, token)
      .then(utils.expectGqlError(err.RESPONSES_EMPTY_LIST, resolver))
  })

  let ents: Ents
  test('200 Responses found', async () => {
    ents = await createEnts()
    const formId = (ents.objectsByForm[0].form as FormDocument)._id.toString()
    const rest = createFormRest(formId)
    return baseRequest({ rest }, ents.token)
      .then(response => {
        // utils.printForDocs(response.body)
        baseResponseExpected(response)
      })
  })

  const sortTests = [
    {
      sort: '-createdAt',
      func: (a: any, b: any): number => utils.sortByDateDesc(a.createdAt, b.createdAt)
    },
    {
      sort: 'createdAt',
      func: (a: any, b: any): number => utils.sortByDateAsc(a.createdAt, b.createdAt)
    }
  ]
  const defaultSort = sortTests[0]
  for (const t of sortTests) {
    test(`200 Responses found - test sort by ${t.sort}`, () => {
      const formId = (ents.objectsByForm[0].form as FormDocument)._id.toString()
      const rest = createFormRest(formId)

      const sorted = ents.objectsByForm.sort(t.func)
      return baseRequest({ sort: t.sort, rest }, ents.token)
        .then(response => {
          baseResponseExpected(response)
          const { responses } = response.body.data[resolver] as
          ListResponsesResponse
          responses.forEach((obj, i) => {
            checkResponse(sorted[i], obj)
          })
        })
    })
  }

  test('200 Responses found - test paginate', () => {
    const formId = (ents.objectsByForm[0].form as FormDocument)._id.toString()
    const rest = createFormRest(formId)

    const sorted = ents.objectsByForm.sort(defaultSort.func)
    return baseRequest({ page: 1, perPage: 2, rest }, ents.token)
      .then(response => {
        baseResponseExpected(response, 3, 2)
        const { responses } = response.body.data[resolver] as
         ListResponsesResponse
        responses.forEach((obj, i) => {
          checkResponse(sorted[i + 2], obj)
        })
      })
  })

  for (const i of [0, 1, 2]) {
    test(`200 Responses found - filter by question #${i}`, () => {
      const objects = ents.objectsByForm
      const { form } = objects[i]

      const question = objects[i].answersAndQuestions[0].question

      const formRest = createFormRest((form as FormDocument)._id).toString()
      const questionRest = createQuestionRest((question as QuestionDocument)
        ._id.toString())
      const rest = formRest + questionRest

      const expected = [objects[i]]

      return baseRequest({ rest }, ents.token)
        .then(response => {
          baseResponseExpected(response, expected.length, 1)
          const {
            responses
          } = response.body.data[resolver] as ListResponsesResponse
          responses.forEach((obj, i) => {
            checkResponse(expected[i], obj)
          })
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(
      ['Response', 'Form', 'User', 'Client', 'QuestionType', 'Question'])
  })
}
