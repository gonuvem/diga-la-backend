import { createError } from '../utils'

/* Model Client 710 - 719 */
export const CLIENTS_EMPTY_LIST = createError({
  message: 'Nenhum cliente encontrado',
  statusCode: 404,
  internalCode: 710
})

export const CLIENT_NOT_FOUND = createError({
  message: 'Cliente não encontrado',
  statusCode: 404,
  internalCode: 711
})

export const CLIENT_IN_USE = createError({
  message: 'Esse cliente não pode ser deletado pois está em uso por outros objetos',
  statusCode: 422,
  internalCode: 712
})
