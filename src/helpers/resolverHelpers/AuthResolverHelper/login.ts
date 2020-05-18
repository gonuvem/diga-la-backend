import { fetchOneUser } from '../../../services/models/UserService'
import {
  createToken
} from '../../../middlewares/authentication/authenticationHelper'
import { UserDocument } from '../../../interfaces'
import Client from '../../../models/Client'
import { Role } from '../../../enums'
import { LoginResponse, LoginParams, UserRoleInfo } from '../../../types'
import { checkIfPasswordIsCorrect } from '../../UserHelper'

const mapRoleToModel = {
  [Role.Client]: Client
}

const getUserObjectByRole = async (role:Role, userId: string,
  projection: string) : Promise<UserRoleInfo> => {
  if (role === Role.Dev) return null

  const Model = mapRoleToModel[role]

  return Model.findOne({ user: userId }, projection)
    .populate('user', '-password -renewPasswordCode').lean()
}

const getUserRoleInfo = async (user: UserDocument): Promise<UserRoleInfo> => {
  const role = user.roles[0]

  const { password, ...userData } = user

  if (role === Role.Dev) return { _id: null, user: userData }

  return getUserObjectByRole(role, user._id, '_id user')
}

export async function login ({ email, password }: LoginParams):
 Promise<LoginResponse> {
  const user = await fetchOneUser({
    conditions: { email },
    projection: '-renewPasswordCode'
  })

  await checkIfPasswordIsCorrect(user, password)

  const [token, info] = await Promise.all([
    createToken(user._id),
    getUserRoleInfo(user)
  ])

  return { token, info }
}
