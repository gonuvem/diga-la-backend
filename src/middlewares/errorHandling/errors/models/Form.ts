import { createError } from '../utils'

/* Model Form 720 - 729 */
export const FORMS_EMPTY_LIST = createError({
  message: 'Nenhuma pesquisa encontrada',
  statusCode: 404,
  internalCode: 720
})

export const FORM_NOT_FOUND = createError({
  message: 'Pesquisa não encontrada',
  statusCode: 404,
  internalCode: 721
})

export const FORM_IN_USE = createError({
  message: 'Essa pesquisa não pode ser deletada pois está em uso por outros objetos',
  statusCode: 422,
  internalCode: 722
})
