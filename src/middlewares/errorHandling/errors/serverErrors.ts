import { createError } from './utils'

/** Servidor 600 - 609 */

export const UNDEFINED = createError({
  message: '',
  statusCode: 500,
  internalCode: 600
})

export const ROUTE_NOT_FOUND = createError({
  message: 'Endpoint não existe',
  statusCode: 404,
  internalCode: 601
})
