import { GraphQLResolveInfo } from 'graphql'

import * as jwt from './jwt'
import { INVALID_AUTH_HEADER } from '../errorHandling/errors'
import { TokenPayload, MyContext, ID } from '../../types'
import { fetchOneUser } from '../../services/models/UserService'

export const createToken = (accountId: ID): Promise<string> => {
  return jwt.sign({ _id: accountId })
}

export const verifyToken = (token: string): Promise<TokenPayload> => {
  return jwt.verify(token)
}

export const extractTokenFromAuthHeader = async (authorization: string)
: Promise<string> => {
  if (!authorization || !(authorization.search('Bearer ') === 0)) {
    throw INVALID_AUTH_HEADER
  }

  const token = authorization.split(' ')[1]

  if (!token) throw INVALID_AUTH_HEADER

  return token
}

export const isGqlAuthenticated = (resolver: Function) => async (
  parent: unknown, args: unknown, context: MyContext, info: GraphQLResolveInfo)
  : Promise<unknown> => {
  const { req } = context

  const authorization = req.headers.authorization

  const token = await extractTokenFromAuthHeader(authorization)

  const payload = await verifyToken(token)

  const user = await fetchOneUser({ conditions: { _id: payload._id } })

  context.user = user

  return resolver(parent, args, context, info)
}
