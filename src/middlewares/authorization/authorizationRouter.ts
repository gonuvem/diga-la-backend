import { Role } from '../../enums'

/**
 * Determina os papéis que podem acessar uma operação grapqhl
 * @example { createUser: [Role.Dev, Role.Admin] }
 */
export const gqlRouter: { [resolverName: string]: Role[] } = {
  readOwnProfile: [Role.Client],
  updateOwnProfile: [Role.Client],

  createClient: [Role.Dev],
  updateClient: [Role.Dev]
}
