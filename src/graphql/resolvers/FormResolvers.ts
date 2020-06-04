import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthenticated from '../../middlewares/authentication'
import isGqlAuthorized from '../../middlewares/authorization'
import * as FormResolverHelper from '../../helpers/resolverHelpers/FormResolverHelper'
import {
  MyContext,
  CreateOwnFormInput,
  UpdateOwnFormInput,
  ListOwnFormsParams,
  ListFormsResponse
} from '../../types'
import { FormDocument } from '../../interfaces'

const createOwnForm = (_parent: object, _args: object,
  context: MyContext<{ input: CreateOwnFormInput }>)
  : Promise<{ form: FormDocument }> => {
  return FormResolverHelper.createOwnForm(context.user, context.validData.input)
}

const updateOwnForm = (_parent: object, _args: object,
  context: MyContext<{ id: string, input: UpdateOwnFormInput }>)
  : Promise<{ form: FormDocument }> => {
  return FormResolverHelper.updateOwnForm(context.user, context.validData)
}

const deleteOwnForm = (_parent: object, _args: object,
  context: MyContext<{ id: string }>) : Promise<{}> => {
  return FormResolverHelper.deleteOwnForm(context.user, context.validData)
}

const listOwnForms = (_parent: object, _args: object,
  context: MyContext<ListOwnFormsParams>): Promise<ListFormsResponse> => {
  return FormResolverHelper.listOwnForms(context.user, context.validData)
}

const readOwnForm = (_parent: object, _args: object,
  context: MyContext<{ id: string }>): Promise<{ form: FormDocument }> => {
  return FormResolverHelper.readOwnForm(context.user, context.validData)
}

const showForm = (_parent: object, _args: object,
  context: MyContext<{ id: string }>): Promise<{ form: FormDocument }> => {
  return FormResolverHelper.showForm(context.validData)
}

export const Query = {
  listOwnForms: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(listOwnForms)))),
  readOwnForm: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(readOwnForm)))),
  showForm: wrapGqlAsyncFunc(validateGqlRequest(showForm))
}

export const Mutation = {
  createOwnForm: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(createOwnForm)))),
  updateOwnForm: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(updateOwnForm)))),
  deleteOwnForm: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(deleteOwnForm))))
}

export const references = {
  Form: {
    client: FormResolverHelper.getFormClient,
    numResponses: FormResolverHelper.getFormNumResponses
  }
}
