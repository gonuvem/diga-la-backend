import Response from 'src/models/Response'
import {
  createOne,
  fetchOneWithPopulate,
  updateOne,
  deleteOne,
  listPaginatedWithPopulate
} from 'src/utils/mongoose'
import {
  RESPONSES_EMPTY_LIST,
  RESPONSE_NOT_FOUND
} from 'src/middlewares/errorHandling/errors'

const populate = [
  {
    path: 'form',
    populate: { path: 'client', populate: { path: 'user' } }
  }
]

export const createOneResponse = createOne(Response)

export const fetchOneResponseWithForm = fetchOneWithPopulate(
  Response, RESPONSE_NOT_FOUND, populate)

export const updateOneResponse = updateOne(Response, RESPONSE_NOT_FOUND)

export const deleteOneResponse = deleteOne(Response, RESPONSE_NOT_FOUND)

export const listResponsesWithFormPaginated =
listPaginatedWithPopulate(Response, RESPONSES_EMPTY_LIST, populate)
