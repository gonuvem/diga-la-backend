import Client from '../../models/Client'
import Form from '../../models/Form'
import {
  createOne,
  createOneObject,
  fetchOne,
  updateOne,
  deleteOne,
  checkInUse,
  createLookupObj,
  fetchOneWithoutError
} from '../../utils/mongoose'
import {
  CLIENTS_EMPTY_LIST,
  CLIENT_NOT_FOUND,
  CLIENT_IN_USE
} from '../../middlewares/errorHandling/errors'
import { isEmptyArray } from '../../utils/general'
import { BaseListResult, ClientDocument } from '../../interfaces'

export const createOneClient = createOne(Client)

export const createOneClientObject = createOneObject(Client)

export const fetchOneClient = fetchOne(Client, CLIENT_NOT_FOUND)

export const updateOneClient = updateOne(Client, CLIENT_NOT_FOUND)

export const deleteOneClient = deleteOne(Client, CLIENT_NOT_FOUND)

export const checkClientInUse = checkInUse(
  [{ Model: Form, fieldName: 'client' }], CLIENT_IN_USE
)

export const fetchOneClientWithoutError = fetchOneWithoutError(Client)

export const listClientsWithUserPaginated = async (conditions: object,
  projection: string, sort: string, page: number, perPage: number)
  : Promise<BaseListResult<ClientDocument>> => {
  const aggregation = Client.aggregate().match(conditions)
    .lookup(createLookupObj('users', 'user')).unwind('user')

  const [count, objects] = await Promise.all([
    Client.aggregate(aggregation.pipeline()).count('total'),
    aggregation.sort(sort).skip(page * perPage).limit(perPage)
  ])

  if (isEmptyArray(objects)) throw CLIENTS_EMPTY_LIST

  const total = (count[0] && count[0].total) || 0

  const pages = Math.ceil(total / perPage)

  return { objects, total, pages }
}
