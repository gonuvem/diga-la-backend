/* eslint-disable @typescript-eslint/camelcase */
import { Boom, isBoom } from '@hapi/boom'
import { Request, Response, NextFunction } from 'express'
import { GraphQLResolveInfo } from 'graphql'

import { UNDEFINED } from './errors'
import { IS_NOT_PRODUCTION } from '../../utils/constants'
import { MyContext, MyError } from '../../types'
import Sentry from '../../sentry'

export const createErrorResponse = (err: Boom | Error): MyError => {
  const error = isBoom(err) ? err : UNDEFINED

  return {
    ...error.output.payload,
    ...error.data,
    internalError: IS_NOT_PRODUCTION ? err : null
  }
}

export const handleError = (err: Boom | Error, _req: Request, res: Response,
  _next: NextFunction): Response => {
  const error = isBoom(err) ? err : UNDEFINED

  const myError = createErrorResponse(error)

  return res.status(error.output.statusCode).json(myError)
}

const createSentryScopeForUnexpectedError = (
  error: Boom | Error, parent: unknown, args: unknown, context: MyContext,
  info: GraphQLResolveInfo) => (scope: Sentry.Scope): void => {
  scope.addEventProcessor((event) =>
    Sentry.Handlers.parseRequest(event, context.req)
  )
  const user = context.user
  if (user) {
    scope.setUser({
      email: user.email,
      id: user._id,
      ip_address: context.req.ip,
      username: user.name
    })
  }

  scope.setTags({ graphql: info.fieldName, graphqlName: info.fieldName })

  Sentry.captureException(error)
}

const isUnexpectedError = (error: Boom | Error): boolean => {
  return (isBoom(error) && error.output.statusCode >= 500) || !isBoom(error)
}

const createGqlErrorResponse = (parent: unknown, args: unknown,
  context: MyContext, info: GraphQLResolveInfo) => (error: Boom | Error)
  : object => {
  if (isUnexpectedError(error)) {
    Sentry.withScope(
      createSentryScopeForUnexpectedError(error, parent, args, context, info))
  }

  return { error: createErrorResponse(error) }
}

export const wrapGqlAsyncFunc = (asyncFunction: Function) =>
  (parent: unknown, args: unknown, context: MyContext, info: GraphQLResolveInfo)
  : unknown => {
    return asyncFunction(parent, args, context, info)
      .catch(createGqlErrorResponse(parent, args, context, info))
  }

export const wrapAsync = (asyncFunction: Function) => {
  return function (req: Request, res: Response, next: NextFunction): void {
    asyncFunction(req, res, next).catch(next)
  }
}
