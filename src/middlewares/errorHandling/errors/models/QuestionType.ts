import { createError } from '../utils'

/* Model QuestionType 730 - 739 */
export const QUESTION_TYPES_EMPTY_LIST = createError({
  message: 'Nenhum tipo de questão encontrado',
  statusCode: 404,
  internalCode: 730
})

export const QUESTION_TYPE_NOT_FOUND = createError({
  message: 'Tipo de questão não encontrado',
  statusCode: 404,
  internalCode: 731
})

export const QUESTION_TYPE_IN_USE = createError({
  message: 'Esse tipo de questão não pode ser deletado pois está em uso por outros objetos',
  statusCode: 422,
  internalCode: 732
})

export const ALIAS_CONFLICT = createError({
  message: 'Já existe um tipo de questão com este apelido',
  statusCode: 409,
  internalCode: 733
})
