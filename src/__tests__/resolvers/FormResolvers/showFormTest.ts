/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose'

import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { FormDocument } from '../../../interfaces'

const resolver = 'showForm'

const fakeId = Types.ObjectId().toHexString()

let setupData: helpers.SetupTaskResult

const createQuery = ({ id }: { id: string }): string => `
query {
  ${resolver}(id: "${id}") {
    form ${gqlFieldsQuery.formFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const createForm = helpers.createForm
const createClient = helpers.createClient

type Ents = { objects: FormDocument[] }
const createEnts = async (): Promise<Ents> => {
  const { client, user } = await helpers.createClientUserAndToken()

  client.user = user

  const o1 = await createForm({ body: { client: client._id } })
  o1.client = client

  const o2 = await createForm({ body: { client: client._id } })
  o2.client = client

  const o3 = await createForm({ body: { client: client._id } })
  o3.client = client

  const objects = [o1, o2, o3]

  return { objects }
}

const baseRequest = utils.baseGqlRequest(app, createQuery)

const checkResponse = (expected: any, received: any): void => {
  checkObjects.checkForm(expected, received)
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

  test('404 Form not found - no form', async () => {
    await createClient({ body: { user: setupData.client.user } })
    return baseRequest({ id: fakeId }, setupData.client.token)
      .then(utils.expectGqlError(err.FORM_NOT_FOUND, resolver))
  })

  let ents: Ents
  test('404 Form not found - wrong id', async () => {
    ents = await createEnts()

    return baseRequest({ id: fakeId })
      .then(utils.expectGqlError(err.FORM_NOT_FOUND, resolver))
  })

  for (let i = 0; i < 3; i++) {
    test(`200 Form found - form #${i + 1}`, () => {
      const expected = ents.objects[i]
      return baseRequest({ id: expected._id.toString() })
        .then(response => {
          const { form, error } = response.body.data[resolver]
          expect(error).toBeNull()
          checkResponse(expected, form)
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(['Form', 'User'])
  })
}
