import { Schema } from '@hapi/joi'
import { GraphQLResolveInfo } from 'graphql'

import { gqlRouter } from './schemasRouter'
import { VALIDATION_ERROR } from '../errorHandling/errors'
import { MyContext } from '../../types'

/** Opções do Joi de validação */
const _validationOptions = {
  /** Não abortar após o último erro de validação */
  abortEarly: false,
  /** Permitir chaves desconhecidas que serão ignoradas */
  allowUnknown: true,
  /** Remover chaves desconhecidas dos dados validados */
  stripUnknown: true
}

export const validateData = async (data: unknown, schema: Schema,
  options = _validationOptions): Promise<object> => {
  return new Promise((resolve, reject) => {
    const result = schema.validate(data, options)

    result.error ? reject(result.error) : resolve(result.value)
  })
}

export const validateGqlRequest = (resolver: Function) => async (
  parent: unknown, args: unknown, context: MyContext, info: GraphQLResolveInfo)
  : Promise<unknown> => {
  try {
    const data = await validateData(args, gqlRouter[info.fieldName])

    context.validData = data

    return resolver(parent, args, context, info)
  } catch (error) {
    throw VALIDATION_ERROR(error.message)
  }
}
