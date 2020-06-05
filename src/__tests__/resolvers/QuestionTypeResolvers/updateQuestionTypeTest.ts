/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import Factory from '../../../factories'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role, QuestionTypeAlias } from '../../../enums'
import {
  QuestionTypeDocument,
  QuestionTypeInterface
} from '../../../interfaces'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { UpdateQuestionTypeInput } from '../../../types'
import * as gqlInputs from '../../gqlInputs'

const resolver = 'updateQuestionType'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createInput = gqlInputs.createInputUpdateQuestionType

const createQuery = (
  { id, input }: { id: string, input: UpdateQuestionTypeInput }): string => `
mutation {
  ${resolver}(id: "${id}", input: ${createInput(input)}) {
    type ${gqlFieldsQuery.questionTypeFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: QuestionTypeDocument,
  received: QuestionTypeDocument): void => {
  checkObjects.checkQuestionType(expected, received)
  expect(received).toMatchObject({
    _id: expected._id.toString()
  })
}

const createFakeBody = (body: Partial<QuestionTypeInterface> = {})
: QuestionTypeInterface =>
  Factory.build<QuestionTypeInterface>('QuestionType', body)

type Ents = { objects: QuestionTypeDocument[] }
const createEnts = async (): Promise<Ents> => {
  const o1 = await helpers.createQuestionType(
    { body: { alias: QuestionTypeAlias.CheckBox } })
  const o2 = await helpers.createQuestionType(
    { body: { alias: QuestionTypeAlias.Date } })

  const objects = [o1, o2]

  return { objects }
}

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask()
  })

  const body = createFakeBody()
  utils.testIsGqlAuthenticated(app, resolver, createQuery(
    { id: fakeId, input: body }))

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Dev
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

  test('404 QuestionType not found - no type', async () => {
    const body = createFakeBody()

    return baseRequest({ id: fakeId, input: body }, setupData.dev.token)
      .then(utils.expectGqlError(err.QUESTION_TYPE_NOT_FOUND, resolver))
  })

  let ents: Ents
  test('404 QuestionType not found - wrong id', async () => {
    ents = await createEnts()
    const body = createFakeBody()
    return baseRequest({ id: fakeId, input: body }, setupData.dev.token)
      .then(utils.expectGqlError(err.QUESTION_TYPE_NOT_FOUND, resolver))
  })

  test('409 QuestionType conflict - same alias', async () => {
    const id = ents.objects[0]._id.toString()

    const body = createFakeBody({ alias: ents.objects[1].alias })

    return baseRequest({ id, input: body }, setupData.dev.token)
      .then(utils.expectGqlError(err.ALIAS_CONFLICT, resolver))
  })

  test('200 QuestionType updated', async () => {
    const baseType = ents.objects[0]
    const id = baseType._id.toString()

    const body = createFakeBody({ alias: QuestionTypeAlias.Email })

    return baseRequest({ id, input: body }, setupData.dev.token)
      .then(response => {
        // utils.printForDocs(response.body)
        const { type, error } = response.body.data[resolver]
        expect(error).toBe(null)
        const expected = { ...baseType.toJSON(), ...body }
        checkResponse(expected, type)
      })
  })

  afterAll(async () => {
    await helpers.dropCollections(['User', 'QuestionType'])
  })
}
