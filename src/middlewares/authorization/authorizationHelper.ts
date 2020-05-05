import { GraphQLResolveInfo } from 'graphql'

import { USER_NOT_ALLOWED } from '../errorHandling/errors'
import { gqlRouter } from './authorizationRouter'
import { Role } from '../../enums'
import { MyContext } from '../../types'

export const getRoleWithTheHighestPermission = async (roles: Role[])
: Promise<Role> => {
  if (roles.includes(Role.Dev)) return Role.Dev
  if (roles.includes(Role.Admin)) return Role.Admin
  if (roles.includes(Role.Client)) return Role.Client
  throw USER_NOT_ALLOWED
}

export const isGqlAuthorized = (resolver: Function) => async (
  parent: unknown, args: unknown, context: MyContext, info: GraphQLResolveInfo)
  : Promise<unknown> => {
  const rolesAllowed = gqlRouter[info.fieldName] || []

  const canAccessRoute = (role: Role): boolean => rolesAllowed.includes(role)

  const isAuthorized = context.user.roles.some(canAccessRoute)

  if (!isAuthorized) throw USER_NOT_ALLOWED

  return resolver(parent, args, context, info)
}
