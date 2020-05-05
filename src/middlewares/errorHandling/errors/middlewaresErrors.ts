import { createError } from './utils'

/** Middlewares 610 - 699 */

/* Middleware de autenticação 610 - 619 */
export const INVALID_TOKEN = createError({
  message: 'Token inválido',
  statusCode: 403,
  internalCode: 610
})

export const INVALID_AUTH_HEADER = createError({
  message: 'Cabeçalho de autorização inválido',
  statusCode: 401,
  internalCode: 611
})
