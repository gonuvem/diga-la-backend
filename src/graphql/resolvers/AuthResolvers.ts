import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthorized from '../../middlewares/authorization'
import {
  isGqlAuthenticated
} from '../../middlewares/authentication/authenticationHelper'
import * as AuthResolverHelper from '../../helpers/resolverHelpers/AuthResolverHelper'
import {
  MyContext,
  LoginParams,
  LoginResponse,
  ValidateTokenParams,
  ForgotPasswordParams,
  RenewPasswordParams,
  UpdateOwnProfileInput
} from '../../types'
import { ClientDocument } from '../../interfaces'

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

const renewPassword = (_parent: object, _args: object,
  context: MyContext<RenewPasswordParams>)
: Promise<{}> => {
  return AuthResolverHelper.renewPassword(context.validData)
}

const readOwnProfile = (_parent: object, _args: object, context: MyContext)
: Promise<{ client: ClientDocument }> => {
  return AuthResolverHelper.readOwnProfile(context.user)
}

const updateOwnProfile = async (_parent: object, _args: object,
  context: MyContext<{ input: UpdateOwnProfileInput }>)
  : Promise<{ client: ClientDocument }> => {
  return AuthResolverHelper.updateOwnProfile(context.user,
    context.validData.input)
}

export const Query = {
  readOwnProfile: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    readOwnProfile)))
}

export const Mutation = {
  login: wrapGqlAsyncFunc(validateGqlRequest(login)),
  validateToken: wrapGqlAsyncFunc(validateGqlRequest(validateToken)),
  forgotPassword: wrapGqlAsyncFunc(validateGqlRequest(forgotPassword)),
  renewPassword: wrapGqlAsyncFunc(validateGqlRequest(renewPassword)),
  updateOwnProfile: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(updateOwnProfile))))
}
