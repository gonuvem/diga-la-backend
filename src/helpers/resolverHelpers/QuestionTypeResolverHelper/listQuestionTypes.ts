import {
  ListQuestionTypesParams,
  ListQuestionTypesResponse
} from '../../../types'
import {
  listQuestionTypesPaginated
} from '../../../services/models/QuestionTypeService'
import { createFilterQuery } from '../../../utils/filter'

const createListQuestionTypesConditions = async (
  { alias, kind }: ListQuestionTypesParams): Promise<object> => {
  const filter = await createFilterQuery([
    { type: 'string', name: 'kind', value: kind },
    { type: 'string', name: 'alias', value: alias }
  ])

  return { ...filter }
}

export async function listQuestionTypes (
  { sort, page, perPage, ...filters }: ListQuestionTypesParams):
   Promise<ListQuestionTypesResponse> {
  const conditions = await createListQuestionTypesConditions(filters)

  const { objects: types, total, pages } = await listQuestionTypesPaginated(
    { conditions, sort, page, perPage })

  return { types, total, pages }
}
