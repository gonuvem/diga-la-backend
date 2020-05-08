import { createError } from '../utils'

/* Model User 700 - 709 */
export const USER_NOT_FOUND = createError({
  message: 'Usuário não encontrado',
  statusCode: 404,
  internalCode: 700
})

export const EMAIL_CONFLICT = createError({
  message: 'Já existe um usuário com este email',
  statusCode: 409,
  internalCode: 703
})

export const WRONG_RENEW_PASSWORD_CODE = createError({
  message: 'Código de renovação de senha incorreto',
  statusCode: 422,
  internalCode: 704
})

export const PASSWORD_INCORRECT = createError({
  message: 'Senha incorreta',
  statusCode: 403,
  internalCode: 709
})
