import { Types } from 'mongoose'
import { Context } from 'apollo-server-core'
import { Request, Response } from 'express'
import Joi from '@hapi/joi'

import { UserDocument } from '../interfaces'

export type MyError = {
  message: string,
  statusCode: number,
  internalCode: number,
  internalError?: Error
}

export type TokenPayload = {
  _id: Types.ObjectId
}

export type MyContext<T = object> = Context & {
  req: Request,
  res: Response,
  validData?: T,
  user?: UserDocument
}

/** Cria um contrato entre os schemas de validação e a interface passada */
export type JoiSchemaMap<T> = {
  [key in keyof T]: Joi.AnySchema
}

/** Cria um contrato entre as definições de model e a interface passada */
export type MongooseDefinition<T> = {
  [key in keyof T]: object
}

/** Cria um contrato entre os campos de uma fábrica e a interface passada */
export type Fake<T> = {
  [key in keyof T]: () => T[key]
}
