import { Types } from 'mongoose'
import { Context } from 'apollo-server-core'
import { Request, Response } from 'express'

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

export type MyContext = Context & {
  req: Request,
  res: Response,
  validData?: any,
  user?: UserDocument
}
