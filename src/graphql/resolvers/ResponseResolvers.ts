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
import { ResponseDocument } from '../../interfaces'

const listOwnResponses = (_parent: object, _args: object,
  context: MyContext<ListOwnResponsesParams>)
  : Promise<ListResponsesResponse> => {
  return ResponseResolverHelper.listOwnResponses(context.user,
    context.validData)
}

const readOwnResponse = (_parent: object, _args: object,
  context: MyContext<{ id: string }>)
  : Promise<{ response: ResponseDocument }> => {
  return ResponseResolverHelper.readOwnResponse(context.user, context.validData)
}

export const Query = {
  listOwnResponses: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(listOwnResponses)))),
  readOwnResponse: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(readOwnResponse))))
}
