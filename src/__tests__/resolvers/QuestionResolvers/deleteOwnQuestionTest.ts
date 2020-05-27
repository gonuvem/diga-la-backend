/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { Role } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import { QuestionDocument } from '../../../interfaces'

const resolver = 'deleteOwnQuestion'

let setupData: helpers.SetupTaskResult

const createQuery = ({ id }: { id: string }): string => `
mutation {
  ${resolver}(id: "${id}") {
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`

const baseRequest = utils.baseGqlRequest(app, createQuery)

const fakeId = Types.ObjectId().toHexString()

type Ents = { objects: QuestionDocument[], token: string }
const createEnts = async (): Promise<Ents> => {
  const { token, client, user } = await helpers.createClientUserAndToken()
  client.user = user

  const [o1, o2] = await Promise.all([
    helpers.createQuestion({ }),
    helpers.createQuestion({ })
  ])

  await Promise.all([
    helpers.createResponse({
      body: { answersAndQuestions: [{ answer: 'x', question: o1._id }] }
    })
  ])

  const objects = [o1, o2]

  return { objects, token }
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

  let ents: Ents
  test('404 Question not found', async () => {
    ents = await createEnts()
    return baseRequest({ id: fakeId }, ents.token)
      .then(utils.expectGqlError(err.QUESTION_NOT_FOUND, resolver))
  })

  for (const i in [0]) {
    test('422 Question in use', async () => {
      const id = ents.objects[i]._id
      return baseRequest({ id }, ents.token)
        .then(utils.expectGqlError(err.QUESTION_IN_USE, resolver))
    })
  }

  test('200 Question deleted', () => {
    const id = ents.objects[1]._id
    return baseRequest({ id }, ents.token)
      .then(response => {
        // utils.printForDocs(response.body)
        const { error } = response.body.data[resolver]
        expect(error).toBe(null)
      })
  })

  test('404 Question not found - already deleted', async () => {
    const id = ents.objects[1]._id
    return baseRequest({ id }, ents.token)
      .then(utils.expectGqlError(err.QUESTION_NOT_FOUND, resolver))
  })

  afterAll(async () => {
    await helpers.dropCollections(
      ['Question', 'User', 'Client', 'Question', 'Response']
    )
  })
}
