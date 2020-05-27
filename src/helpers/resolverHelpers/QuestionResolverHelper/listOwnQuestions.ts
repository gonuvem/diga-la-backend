import { UserDocument } from '../../../interfaces'
import { ListOwnQuestionsParams, ListQuestionsResponse } from '../../../types'
import {
  listQuestionsWithFormAndTypePaginated
} from '../../../services/models/QuestionService'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'
import { createFilterQuery } from '../../../utils/filter'

const createListOwnQuestionsConditions = async (
  { form, formPage }: ListOwnQuestionsParams): Promise<object> => {
  const filter = await createFilterQuery([
    { type: 'id', name: 'form', value: form },
    { type: 'number', name: 'formPage', value: formPage }
  ])

  return { ...filter }
}

export async function listOwnQuestions (user: UserDocument,
  { sort, page, perPage, ...filters }: ListOwnQuestionsParams)
  : Promise<ListQuestionsResponse> {
  await fetchOneClientWithUser({ conditions: { user: user._id } })

  const conditions = await createListOwnQuestionsConditions(filters)

  const {
    objects: questions,
    total,
    pages
  } = await listQuestionsWithFormAndTypePaginated(
    { conditions, page, perPage, sort })

  return { questions, total, pages }
}
