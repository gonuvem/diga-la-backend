import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthenticated from '../../middlewares/authentication'
import isGqlAuthorized from '../../middlewares/authorization'
import * as ResponseResolverHelper from '../../helpers/resolverHelpers/ResponseResolverHelper'
import {
  MyContext,
  ListOwnResponsesParams,
  ListResponsesResponse
} from '../../types'

const listOwnResponses = (_parent: object, _args: object,
  context: MyContext<ListOwnResponsesParams>)
  : Promise<ListResponsesResponse> => {
  return ResponseResolverHelper.listOwnResponses(context.user,
    context.validData)
}

export const Query = {
  listOwnResponses: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(listOwnResponses))))
}
