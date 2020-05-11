import Client from 'src/models/Client'
import Form from 'src/models/Form'
import {
  createOne,
  createOneObject,
  fetchOneWithPopulate,
  updateOne,
  deleteOne,
  checkInUse,
  listPaginatedWithPopulate
} from 'src/utils/mongoose'
import {
  CLIENTS_EMPTY_LIST,
  CLIENT_NOT_FOUND,
  CLIENT_IN_USE
} from 'src/middlewares/errorHandling/errors'

const populate = 'user'

export const createOneClient = createOne(Client)

export const createOneClientObject = createOneObject(Client)

export const fetchOneClientWithUser = fetchOneWithPopulate(
  Client, CLIENT_NOT_FOUND, populate)

export const updateOneClient = updateOne(Client, CLIENT_NOT_FOUND)

export const deleteOneClient = deleteOne(Client, CLIENT_NOT_FOUND)

export const checkClientInUse = checkInUse(
  [{ Model: Form, fieldName: 'client' }], CLIENT_IN_USE
)

export const listClientsWithUserPaginated =
listPaginatedWithPopulate(Client, CLIENTS_EMPTY_LIST, populate)
