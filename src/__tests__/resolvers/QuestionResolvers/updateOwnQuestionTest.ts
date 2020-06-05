/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import Factory from '../../../factories'
import * as gqlInputs from '../../gqlInputs'
import { QuestionDocument } from '../../../interfaces'

import { UpdateOwnQuestionInput } from '../../../types'

const resolver = 'updateOwnQuestion'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createInput = gqlInputs.createInputUpdateOwnQuestion

const createQuery = ({ id, input }: { id: string, input: UpdateOwnQuestionInput })
: string => `
mutation {
  ${resolver}(id: "${id}", input: ${createInput(input)}) {
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

const checkResponse = (expected: QuestionDocument, received: QuestionDocument)
: void => {
  checkObjects.checkQuestion(expected, received)
  expect(received).toMatchObject({
    _id: expected._id.toString(),
    createdAt: expected.createdAt.toISOString()
  })
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const body = Factory.build<UpdateOwnQuestionInput>('Question')

  utils.testIsGqlAuthenticated(app, resolver,
    createQuery({ id: fakeId, input: body }))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client
  ])

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest({ id: fakeId, input: body }, setupData[role].token)
        .then(utils.expectGqlError(err.USER_NOT_ALLOWED, resolver))
    })
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest({ id: fakeId, input: body }, setupData[role].token)
        .then(response => {
          expect(response.status).not.toBe(403)
        })
    })
  }

  test('404 Question not found - no question', async () => {
    const { token } = await helpers.createClientUserAndToken()

    return baseRequest({ id: fakeId, input: body }, token)
      .then(utils.expectGqlError(err.QUESTION_NOT_FOUND, resolver))
  })

  let ents: Ents
  test('404 Question not found - wrong id', async () => {
    ents = await createEnts()

    return baseRequest({ id: fakeId, input: body }, ents.token)
      .then(utils.expectGqlError(err.QUESTION_NOT_FOUND, resolver))
  })

  for (let i = 0; i < 3; i++) {
    test(`200 Question updated - question #${i + 1}`, () => {
      const baseQuestion = ents.objects[i]

      const id = baseQuestion._id.toString()

      const body = Factory.build<UpdateOwnQuestionInput>('Question')

      return baseRequest({ id, input: body }, ents.token)
        .then(response => {
          // utils.printForDocs(response.body)
          const { question, error } = response.body.data[resolver]
          expect(error).toBeNull()

          const expected = {
            ...baseQuestion.toJSON(),
            _id: id,
            position: body.position,
            config: body.config
          } as QuestionDocument
          checkResponse(expected, question)
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(
      ['User', 'Question', 'Client', 'Form', 'QuestionType'])
  })
}
