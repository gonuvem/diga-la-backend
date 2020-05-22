/* eslint-disable max-lines-per-function */
import app from '../../../app'
import * as utils from '../../utils'
import * as helpers from '../../helpers'
import * as err from '../../../middlewares/errorHandling/errors'
import { QuestionTypeAlias, QuestionTypeKind } from '../../../enums'
import * as gqlFieldsQuery from '../../gqlFieldsQuery'
import * as checkObjects from '../../checkObjects'
import { QuestionTypeDocument } from '../../../interfaces'
import { ListQuestionTypesResponse } from '../../../types'
import {
  createArgumentRest,
  createNonStringValue,
  createFilterTests
} from '../../gqlTestHelper'

const resolver = 'listQuestionTypes'

let setupData: helpers.SetupTaskResult

const createKindRest = createArgumentRest('kind', createNonStringValue)

const createAliasRest = createArgumentRest('alias', createNonStringValue)

const createQuery = ({ page = 0, perPage = 5, sort = 'name', rest = '' })
: string => `
query {
  ${resolver}(page: ${page}, perPage: ${perPage}, sort: "${sort}"${rest}) {
    types ${gqlFieldsQuery.questionTypeFieldsQuery}
    total
    pages
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`

const baseResponseExpected = utils.baseGqlListResponseExpected('types',
  resolver)

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

const checkResponse = (expected: any, received: any): void => {
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

  utils.testIsGqlAuthenticated(app, resolver, createQuery({}))

  test('404 QuestionTypes empty list', () => {
    return baseRequest({}, setupData.dev.token)
      .then(utils.expectGqlError(err.QUESTION_TYPES_EMPTY_LIST, resolver))
  })

  let ents: Ents
  test('200 QuestionTypes found', async () => {
    ents = await createEnts()
    return baseRequest({}, setupData.dev.token)
      .then(response => {
        // utils.printForDocs(response)
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
    },
    {
      sort: '-name',
      func: (a: any, b: any): number => utils.sortByStringDesc(a.name, b.name)
    },
    {
      sort: 'name',
      func: (a: any, b: any): number => utils.sortByStringAsc(a.name, b.name)
    }
  ]
  const defaultSort = sortTests[3]
  for (const t of sortTests) {
    test(`200 QuestionTypes found - test sort by ${t.sort}`, () => {
      const sorted = ents.objects.sort(t.func)
      return baseRequest({ sort: t.sort }, setupData.dev.token)
        .then(response => {
          baseResponseExpected(response)
          const { types } = response.body.data[resolver] as ListQuestionTypesResponse
          types.forEach((obj, i) => {
            checkResponse(sorted[i], obj)
          })
        })
    })
  }

  test('200 QuestionTypes found - test paginate', () => {
    const sorted = ents.objects.sort(defaultSort.func)
    return baseRequest({ page: 1, perPage: 2 }, setupData.dev.token)
      .then(response => {
        baseResponseExpected(response, 3, 2)
        const { types } = response.body.data[resolver] as ListQuestionTypesResponse
        types.forEach((obj, i) => {
          checkResponse(sorted[i + 2], obj)
        })
      })
  })

  const filterTests = [
    ...createFilterTests(
      'kind',
      createKindRest,
      (value: any) => (o: any): boolean => o.kind === value,
      [QuestionTypeKind.Basic, QuestionTypeKind.Advanced]
    ),
    ...createFilterTests(
      'alias',
      createAliasRest,
      (value: any) => (o: any): boolean => o.alias === value,
      [QuestionTypeAlias.Link, QuestionTypeAlias.Matrix, QuestionTypeAlias.NPS]
    )
  ]
  for (const { field, value, createRest, filterFunc } of filterTests) {
    test(`200 QuestionTypes found - filter by ${field} ${value}`, () => {
      const rest = createRest(value)

      const expected = ents.objects
        .filter(filterFunc(value))
        .sort(defaultSort.func)

      return baseRequest({ rest }, setupData.dev.token)
        .then(response => {
          // utils.printForDocs(response)
          baseResponseExpected(response, expected.length, 1)
          const {
            types
          } = response.body.data[resolver] as ListQuestionTypesResponse
          types.forEach((obj, i) => {
            checkResponse(expected[i], obj)
          })
        })
    })
  }

  afterAll(async () => {
    await helpers.dropCollections(['QuestionType', 'User'])
  })
}
