import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import { MyContext, LoginParams, LoginResponse } from '../../types'
import * as AuthResolverHelper from '../../helpers/resolverHelpers/AuthResolverHelper'

const login = (_parent: object, _args: object, context: MyContext<LoginParams>)
: Promise<LoginResponse> => {
  return AuthResolverHelper.login(context.validData)
}

export const Mutation = {
  login: wrapGqlAsyncFunc(validateGqlRequest(login))
}
