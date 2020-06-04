import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthenticated from '../../middlewares/authentication'
import isGqlAuthorized from '../../middlewares/authorization'
import * as ClientResolverHelper from '../../helpers/resolverHelpers/ClientResolverHelper'
import {
  MyContext,
  CreateClientInput,
  UpdateClientInput,
  ListClientsParams,
  ListClientsResponse
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

const deleteClient = (_parent: object, _args: object,
  context: MyContext<{ id: string }>)
: Promise<{}> => {
  return ClientResolverHelper.deleteClient(context.validData)
}

const listClients = (_parent: object, _args: object,
  context: MyContext<ListClientsParams>)
: Promise<ListClientsResponse> => {
  return ClientResolverHelper.listClients(context.validData)
}

const readClient = async (_parent: object, _args: object,
  context: MyContext<{ id: string }>)
: Promise<{ client: ClientDocument }> => {
  return ClientResolverHelper.readClient(context.validData)
}

export const Query = {
  listClients: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(listClients)))),
  readClient: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(readClient))))
}

export const Mutation = {
  createClient: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(createClient)))),
  updateClient: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(updateClient)))),
  deleteClient: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(deleteClient))))
}

export const references = {
  Client: {
    user: ClientResolverHelper.getClientUser
  }
}
