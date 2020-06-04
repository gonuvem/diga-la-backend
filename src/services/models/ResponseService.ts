import Response from '../../models/Response'
import {
  createOne,
  fetchOne,
  updateOne,
  deleteOne,
  listPaginated,
  countByCriteria
} from '../../utils/mongoose'
import {
  RESPONSES_EMPTY_LIST,
  RESPONSE_NOT_FOUND
} from '../../middlewares/errorHandling/errors'

export const createOneResponse = createOne(Response)

export const fetchOneResponse = fetchOne(Response, RESPONSE_NOT_FOUND)

export const updateOneResponse = updateOne(Response, RESPONSE_NOT_FOUND)

export const deleteOneResponse = deleteOne(Response, RESPONSE_NOT_FOUND)

export const listResponsesPaginated = listPaginated(Response,
  RESPONSES_EMPTY_LIST)

export const countResponsesByCriteria = countByCriteria(Response)
