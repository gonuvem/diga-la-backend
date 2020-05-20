import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthenticated from '../../middlewares/authentication'
import isGqlAuthorized from '../../middlewares/authorization'
import * as FormResolverHelper from '../../helpers/resolverHelpers/FormResolverHelper'
import {
  MyContext,
  CreateOwnFormInput
} from '../../types'
import { FormDocument } from '../../interfaces'

const createOwnForm = (_parent: object, _args: object,
  context: MyContext<{ input: CreateOwnFormInput }>)
  : Promise<{ form: FormDocument }> => {
  return FormResolverHelper.createOwnForm(context.user, context.validData.input)
}

export const Mutation = {
  createOwnForm: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(createOwnForm))))
}
