import { createError } from '../utils'

/* Model Question 750 - 759 */
export const QUESTIONS_EMPTY_LIST = createError({
  message: 'Nenhuma questão encontrada',
  statusCode: 404,
  internalCode: 750
})

export const QUESTION_NOT_FOUND = createError({
  message: 'Questão não encontrada',
  statusCode: 404,
  internalCode: 751
})

export const QUESTION_IN_USE = createError({
  message: 'Essa questão não pode ser deletada pois está em uso por outros objetos',
  statusCode: 422,
  internalCode: 752
})
