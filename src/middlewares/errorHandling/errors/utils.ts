import { Boom } from '@hapi/boom'

import { MyError } from '../../../types'

export const createError = (error: MyError): Boom => {
  const { message, statusCode, internalCode } = error

  return new Boom(message, { statusCode, data: { internalCode } })
}
