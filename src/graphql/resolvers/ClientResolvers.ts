import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthenticated from '../../middlewares/authentication'
import isGqlAuthorized from '../../middlewares/authorization'
import * as ClientResolverHelper from '../../helpers/resolverHelpers/ClientResolverHelper'
import {
  MyContext,
  CreateClientInput,
  UpdateClientInput
} from '../../types'
import { ClientDocument } from '../../interfaces'

const createClient = (_parent: object, _args: object,
  context: MyContext<{ input: CreateClientInput }>)
  : Promise<{ client: ClientDocument }> => {
  return ClientResolverHelper.createClient(context.validData.input)
}

const updateClient = (_parent: object, _args: object,
  context: MyContext<{ id: string, input: UpdateClientInput }>)
: Promise<{ client: ClientDocument }> => {
  return ClientResolverHelper.updateClient(context.validData)
}

export const Mutation = {
  createClient: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(createClient)))),
  updateClient: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(updateClient))))
}
