import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import * as AuthResolverHelper from '../../helpers/resolverHelpers/AuthResolverHelper'
import {
  MyContext,
  LoginParams,
  LoginResponse,
  ValidateTokenParams,
  ForgotPasswordParams
} from '../../types'

const login = (_parent: object, _args: object, context: MyContext<LoginParams>)
: Promise<LoginResponse> => {
  return AuthResolverHelper.login(context.validData)
}

const validateToken = (_parent: object, _args: object,
  context: MyContext<ValidateTokenParams>)
: Promise<{}> => {
  return AuthResolverHelper.validateToken(context.validData)
}

const forgotPassword = (_parent: object, _args: object,
  context: MyContext<ForgotPasswordParams>)
: Promise<{}> => {
  return AuthResolverHelper.forgotPassword(context.validData)
}

export const Mutation = {
  login: wrapGqlAsyncFunc(validateGqlRequest(login)),
  validateToken: wrapGqlAsyncFunc(validateGqlRequest(validateToken)),
  forgotPassword: wrapGqlAsyncFunc(validateGqlRequest(forgotPassword))
}
