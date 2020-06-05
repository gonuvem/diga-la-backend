/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { QuestionTypeAlias, QuestionTypeKind } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { QuestionTypeDocument } from '../../../interfaces'

const resolver = 'readQuestionType'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createQuery = ({ id }: { id: string }): string => `
query {
  ${resolver}(id: "${id}") {
    type ${gqlFieldsQuery.questionTypeFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

type Ents = { objects: QuestionTypeDocument[] }
const createEnts = async (): Promise<Ents> => {
  const o1 = await helpers.createQuestionType({
    body: {
      alias: QuestionTypeAlias.Link,
      kind: QuestionTypeKind.Basic
    }
  })

  const o2 = await helpers.createQuestionType({
    body: {
      alias: QuestionTypeAlias.Matrix,
      kind: QuestionTypeKind.Basic
    }
  })

  const o3 = await helpers.createQuestionType({
    body: {
      alias: QuestionTypeAlias.NPS,
      kind: QuestionTypeKind.Advanced
    }
  })

  const objects = [o1, o2, o3]

  return { objects }
}

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: QuestionTypeDocument,
  received: QuestionTypeDocument): void => {
  checkObjects.checkQuestionType(expected, received)
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

  test('404 QuestionType not found - no type', () => {
    return baseRequest({ id: fakeId }, setupData.dev.token)
      .then(utils.expectGqlError(err.QUESTION_TYPE_NOT_FOUND, resolver))
  })

  let ents: Ents
  test('404 QuestionType not found - wrong id', async () => {
    ents = await createEnts()

    return baseRequest({ id: fakeId }, setupData.dev.token)
      .then(utils.expectGqlError(err.QUESTION_TYPE_NOT_FOUND, resolver))
  })

  for (let i = 0; i < 3; i++) {
    test(`200 QuestionType found - type #${i + 1}`, () => {
      const expected = ents.objects[i]
      return baseRequest({ id: expected._id.toString() }, setupData.dev.token)
        .then(response => {
          const { type, error } = response.body.data[resolver]
          expect(error).toBeNull()
          checkResponse(expected, type)
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(['QuestionType', 'User'])
  })
}
