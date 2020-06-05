/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { ResponseDocument } from '../../../interfaces'

const resolver = 'readOwnResponse'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createQuery = ({ id }: { id: string }): string => `
query {
  ${resolver}(id: "${id}") {
    response ${gqlFieldsQuery.responseFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

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

const checkResponse = (expected: ResponseDocument, received: ResponseDocument)
: void => {
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

  utils.testIsGqlAuthenticated(app, resolver, createQuery({ id: fakeId }))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client
  ])

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest({ id: fakeId }, setupData[role].token)
        .then(utils.expectGqlError(err.USER_NOT_ALLOWED, resolver))
    })
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest({ id: fakeId }, setupData[role].token)
        .then(response => {
          expect(response.status).not.toBe(403)
        })
    })
  }

  test('404 Response not found - no response', async () => {
    await helpers.createClient({ body: { user: setupData.client.user } })
    return baseRequest({ id: fakeId }, setupData.client.token)
      .then(utils.expectGqlError(err.RESPONSE_NOT_FOUND, resolver))
  })

  let ents: Ents
  test('404 Response not found - wrong id', async () => {
    ents = await createEnts()

    return baseRequest({ id: fakeId }, ents.token)
      .then(utils.expectGqlError(err.RESPONSE_NOT_FOUND, resolver))
  })

  for (let i = 0; i < 3; i++) {
    test(`200 Response found - response #${i + 1}`, () => {
      const expected = ents.objectsByForm[i]
      return baseRequest({ id: expected._id.toString() }, ents.token)
        .then(res => {
          // utils.printForDocs(res.body)
          const { response, error } = res.body.data[resolver]
          expect(error).toBeNull()
          checkResponse(expected, response)
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(
      ['User', 'Response', 'Client', 'Form', 'QuestionType', 'Question'])
  })
}
