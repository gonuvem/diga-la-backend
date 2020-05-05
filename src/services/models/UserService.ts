import User from '../../models/User'
import { USER_NOT_FOUND } from '../../middlewares/errorHandling/errors'
import { fetchOne } from '../../utils/mongoose'

export const fetchOneUser = fetchOne(User, USER_NOT_FOUND)
