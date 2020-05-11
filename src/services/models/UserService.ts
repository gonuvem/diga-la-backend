import User from 'src/models/User'
import { USER_NOT_FOUND } from 'src/middlewares/errorHandling/errors'
import {
  fetchOne,
  updateOne,
  deleteOne,
  createOneObject,
  createOne
} from 'src/utils/mongoose'

export const fetchOneUser = fetchOne(User, USER_NOT_FOUND)

export const updateOneUser = updateOne(User, USER_NOT_FOUND)

export const deleteOneUser = deleteOne(User, USER_NOT_FOUND)

export const createOneUserObject = createOneObject(User)

export const createOneUser = createOne(User)
