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
import { QuestionDocument, FormDocument } from '../../../interfaces'
import { ListQuestionsResponse } from '../../../types'
import {
  createArgumentRest,
  createNonStringValue,
  createStringValue
} from '../../gqlTestHelper'

const resolver = 'listOwnQuestions'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createFormRest = createArgumentRest('form', createStringValue)

const createFormPageRest = createArgumentRest('formPage',
  createNonStringValue)

const createQuery = ({ page = 0, perPage = 5, sort = 'position', rest = '' })
: string => `
query {
  ${resolver}(page: ${page}, perPage: ${perPage}, sort: "${sort}"${rest}) {
    questions ${gqlFieldsQuery.questionFieldsQuery}
    total
    pages
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const baseResponseExpected = utils.baseGqlListResponseExpected('questions',
  resolver)

const createQuestion = helpers.createQuestion

type Ents = {
  objects: QuestionDocument[],
  token: string,
  objectsByForm: QuestionDocument[]
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

  const o1 = await createQuestion({
    body: { form: form1._id, type: type._id, formPage: 1 }
  })
  o1.form = form1
  o1.type = type
  const o11 = await createQuestion({
    body: { form: form1._id, type: type._id, formPage: 2 }
  })
  o11.form = form1
  o11.type = type
  const o12 = await createQuestion({
    body: { form: form1._id, type: type._id, formPage: 3 }
  })
  o12.form = form1
  o12.type = type

  const o2 = await createQuestion({ body: { form: form2._id, type: type._id } })
  o2.form = form2
  o2.type = type

  const o3 = await createQuestion({ body: { form: form3._id, type: type._id } })
  o3.form = form3
  o3.type = type

  const objects = [o1, o2, o3]

  return { objects, token, objectsByForm: [o1, o11, o12] }
}

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: QuestionDocument, received: QuestionDocument)
: void => {
  checkObjects.checkQuestion(expected, received)
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

  test('404 Questions empty list', async () => {
    const { token } = await helpers.createClientUserAndToken()

    return baseRequest({ rest }, token)
      .then(utils.expectGqlError(err.QUESTIONS_EMPTY_LIST, resolver))
  })

  let ents: Ents
  test('200 Questions found', async () => {
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
      sort: 'position',
      func: (a: QuestionDocument, b: QuestionDocument): number =>
        utils.sortByNumberAsc(a.position, b.position)
    }
  ]
  const defaultSort = sortTests[0]
  for (const t of sortTests) {
    test(`200 Questions found - test sort by ${t.sort}`, () => {
      const formId = (ents.objectsByForm[0].form as FormDocument)._id.toString()
      const rest = createFormRest(formId)

      const sorted = ents.objectsByForm.sort(t.func)
      return baseRequest({ sort: t.sort, rest }, ents.token)
        .then(response => {
          baseResponseExpected(response)
          const { questions } = response.body.data[resolver] as
          ListQuestionsResponse
          questions.forEach((obj, i) => {
            checkResponse(sorted[i], obj)
          })
        })
    })
  }

  test('200 Questions found - test paginate', () => {
    const formId = (ents.objectsByForm[0].form as FormDocument)._id.toString()
    const rest = createFormRest(formId)

    const sorted = ents.objectsByForm.sort(defaultSort.func)
    return baseRequest({ page: 1, perPage: 2, rest }, ents.token)
      .then(response => {
        baseResponseExpected(response, 3, 2)
        const { questions } = response.body.data[resolver] as
         ListQuestionsResponse
        questions.forEach((obj, i) => {
          checkResponse(sorted[i + 2], obj)
        })
      })
  })

  for (const i of [0, 1, 2]) {
    test(`200 Questions found - filter by formPage of obj #${i}`, () => {
      const objects = ents.objectsByForm
      const { formPage, form } = objects[i]

      const formRest = createFormRest((form as FormDocument)._id).toString()
      const formPageRest = createFormPageRest(formPage)
      const rest = formRest + formPageRest

      const expected = [objects[i]]

      return baseRequest({ rest }, ents.token)
        .then(response => {
          // utils.printForDocs(response)
          baseResponseExpected(response, expected.length, 1)
          const {
            questions
          } = response.body.data[resolver] as ListQuestionsResponse
          questions.forEach((obj, i) => {
            checkResponse(expected[i], obj)
          })
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(
      ['Question', 'Form', 'User', 'Client', 'QuestionType'])
  })
}
