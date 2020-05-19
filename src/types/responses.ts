import { UserDocument, ClientDocument } from '../interfaces'

type BasicUser = {
  _id: UserDocument['_id']
  name: UserDocument['name']
  email: UserDocument['email']
  roles: UserDocument['roles']
}

export type UserRoleInfo = {
  _id?: string
  user: BasicUser
}

export type LoginResponse = {
  token: string,
  info: UserRoleInfo
}

type ListResponse = {
  total: number,
  pages: number
}

export type ListClientsResponse = ListResponse & {
  clients: ClientDocument[]
}
