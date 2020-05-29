import Response from '../../models/Response'
import {
  createOne,
  fetchOneWithPopulate,
  updateOne,
  deleteOne,
  listPaginatedWithPopulate
} from '../../utils/mongoose'
import {
  RESPONSES_EMPTY_LIST,
  RESPONSE_NOT_FOUND
} from '../../middlewares/errorHandling/errors'

const populate = [
  {
    path: 'form',
    populate: { path: 'client', populate: { path: 'user' } }
  },
  {
    path: 'answersAndQuestions.question',
    populate: { path: 'type' }
  }
]

export const createOneResponse = createOne(Response)

export const fetchOneResponseWithForm = fetchOneWithPopulate(
  Response, RESPONSE_NOT_FOUND, populate)

export const updateOneResponse = updateOne(Response, RESPONSE_NOT_FOUND)

export const deleteOneResponse = deleteOne(Response, RESPONSE_NOT_FOUND)

export const listResponsesWithFormPaginated =
listPaginatedWithPopulate(Response, RESPONSES_EMPTY_LIST, populate)
