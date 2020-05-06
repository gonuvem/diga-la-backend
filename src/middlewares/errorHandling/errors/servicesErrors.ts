import { createError } from './utils'

/** Services 900 - 999 */

export const CLOUDINARY_ERROR = createError({
  message: 'Erro do cloudinary',
  statusCode: 500,
  internalCode: 900
})
