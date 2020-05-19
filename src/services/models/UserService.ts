import User from '../../models/User'
import { USER_NOT_FOUND } from '../../middlewares/errorHandling/errors'
import {
  fetchOne,
  updateOne,
  deleteOne,
  createOneObject,
  createOne,
  fetchOneWithoutError,
  fetchAll
} from '../../utils/mongoose'

export const fetchOneUser = fetchOne(User, USER_NOT_FOUND)

export const updateOneUser = updateOne(User, USER_NOT_FOUND)

export const deleteOneUser = deleteOne(User, USER_NOT_FOUND)

export const createOneUserObject = createOneObject(User)

export const createOneUser = createOne(User)

export const fetchOneUserWithoutError = fetchOneWithoutError(User)

export const fetchAllUsers = fetchAll(User)
