import { Role } from '../../enums'

/**
 * Determina os papéis que podem acessar uma operação grapqhl
 * @example { createUser: [Role.Dev, Role.Admin] }
 */
export const gqlRouter: { [resolverName: string]: Role[] } = {}
