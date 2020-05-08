import { createError } from '../utils'

/* Model Response 740 - 749 */
export const RESPONSES_EMPTY_LIST = createError({
  message: 'Nenhuma resposta encontrada',
  statusCode: 404,
  internalCode: 740
})

export const RESPONSE_NOT_FOUND = createError({
  message: 'Resposta não encontrada',
  statusCode: 404,
  internalCode: 741
})
