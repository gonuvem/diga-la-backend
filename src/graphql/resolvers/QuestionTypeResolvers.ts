import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthenticated from '../../middlewares/authentication'
import isGqlAuthorized from '../../middlewares/authorization'
import * as QuestionTypeResolverHelper from '../../helpers/resolverHelpers/QuestionTypeResolverHelper'
import {
  MyContext,
  CreateQuestionTypeInput,
  UpdateQuestionTypeInput
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

export const Mutation = {
  createQuestionType: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(createQuestionType)))),
  updateQuestionType: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(updateQuestionType))))
}
