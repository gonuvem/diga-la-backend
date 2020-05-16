import User from '../../models/User'
import { USER_NOT_FOUND } from '../../middlewares/errorHandling/errors'
import {
  fetchOne,
  updateOne,
  deleteOne,
  createOneObject,
  createOne
} from '../../utils/mongoose'

export const fetchOneUser = fetchOne(User, USER_NOT_FOUND)

export const updateOneUser = updateOne(User, USER_NOT_FOUND)

export const deleteOneUser = deleteOne(User, USER_NOT_FOUND)

export const createOneUserObject = createOneObject(User)

export const createOneUser = createOne(User)
