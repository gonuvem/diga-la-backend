import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthenticated from '../../middlewares/authentication'
import isGqlAuthorized from '../../middlewares/authorization'
import * as QuestionTypeResolverHelper from '../../helpers/resolverHelpers/QuestionTypeResolverHelper'
import {
  MyContext,
  CreateQuestionTypeInput,
  UpdateQuestionTypeInput,
  ListQuestionTypesParams,
  ListQuestionTypesResponse
} from '../../types'
import { QuestionTypeDocument } from '../../interfaces'

const createQuestionType = (_parent: object, _args: object,
  context: MyContext<{ input: CreateQuestionTypeInput }>)
  : Promise<{ type: QuestionTypeDocument }> => {
  return QuestionTypeResolverHelper.createQuestionType(context.validData.input)
}

const updateQuestionType = (_parent: object, _args: object,
  context: MyContext<{ id: string, input: UpdateQuestionTypeInput }>)
: Promise<{ type: QuestionTypeDocument }> => {
  return QuestionTypeResolverHelper.updateQuestionType(context.validData)
}

const deleteQuestionType = (_parent: object, _args: object,
  context: MyContext<{ id: string }>)
: Promise<{}> => {
  return QuestionTypeResolverHelper.deleteQuestionType(context.validData)
}

const listQuestionTypes = (_parent: object, _args: object,
  context: MyContext<ListQuestionTypesParams>)
: Promise<ListQuestionTypesResponse> => {
  return QuestionTypeResolverHelper.listQuestionTypes(context.validData)
}

export const Query = {
  listQuestionTypes: wrapGqlAsyncFunc(isGqlAuthenticated(validateGqlRequest(
    listQuestionTypes)))
}

export const Mutation = {
  createQuestionType: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(createQuestionType)))),
  updateQuestionType: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(updateQuestionType)))),
  deleteQuestionType: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(deleteQuestionType))))
}
