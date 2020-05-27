/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { QuestionDocument } from '../../../interfaces'

const resolver = 'readOwnQuestion'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createQuery = ({ id }: { id: string }): string => `
query {
  ${resolver}(id: "${id}") {
    question ${gqlFieldsQuery.questionFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const createQuestion = helpers.createQuestion

type Ents = { objects: QuestionDocument[], token: string }
const createEnts = async (): Promise<Ents> => {
  const { token, client, user } = await helpers.createClientUserAndToken()
  client.user = user

  const [form, type] = await Promise.all([
    helpers.createForm({ body: { client: client._id } }),
    helpers.createQuestionType({})
  ])
  form.client = client

  const o1 = await createQuestion({ body: { form: form._id, type: type._id } })
  o1.form = form
  o1.type = type

  const o2 = await createQuestion({ body: { form: form._id, type: type._id } })
  o2.form = form
  o2.type = type

  const o3 = await createQuestion({ body: { form: form._id, type: type._id } })
  o3.form = form
  o3.type = type

  const objects = [o1, o2, o3]

  return { objects, token }
}

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: any, received: any): void => {
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

  test('404 Question not found - no question', async () => {
    await helpers.createClient({ body: { user: setupData.client.user } })
    return baseRequest({ id: fakeId }, setupData.client.token)
      .then(utils.expectGqlError(err.QUESTION_NOT_FOUND, resolver))
  })

  let ents: Ents
  test('404 Question not found - wrong id', async () => {
    ents = await createEnts()

    return baseRequest({ id: fakeId }, ents.token)
      .then(utils.expectGqlError(err.QUESTION_NOT_FOUND, resolver))
  })

  for (let i = 0; i < 3; i++) {
    test(`200 Question found - question #${i + 1}`, () => {
      const expected = ents.objects[i]
      return baseRequest({ id: expected._id.toString() }, ents.token)
        .then(response => {
          // utils.printForDocs(response.body)
          const { question, error } = response.body.data[resolver]
          expect(error).toBeNull()
          checkResponse(expected, question)
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(
      ['User', 'Question', 'Client', 'Form', 'QuestionType'])
  })
}
