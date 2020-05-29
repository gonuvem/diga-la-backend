import { UserDocument } from '../../../interfaces'
import { ListOwnResponsesParams, ListResponsesResponse } from '../../../types'
import {
  listResponsesWithFormPaginated
} from '../../../services/models/ResponseService'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'
import { createFilterQuery } from '../../../utils/filter'

const createListOwnResponsesConditions = async (
  { form, question }: ListOwnResponsesParams): Promise<object> => {
  const filter = await createFilterQuery([
    { type: 'id', name: 'form', value: form },
    { type: 'id', name: 'answersAndQuestions.question', value: question }
  ])

  return { ...filter }
}

export async function listOwnResponses (user: UserDocument,
  { sort, page, perPage, ...filters }: ListOwnResponsesParams)
  : Promise<ListResponsesResponse> {
  await fetchOneClientWithUser({ conditions: { user: user._id } })

  const conditions = await createListOwnResponsesConditions(filters)

  const {
    objects: responses,
    total,
    pages
  } = await listResponsesWithFormPaginated(
    { conditions, page, perPage, sort })

  return { responses, total, pages }
}
