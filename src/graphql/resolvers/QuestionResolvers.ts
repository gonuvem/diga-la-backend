import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthenticated from '../../middlewares/authentication'
import isGqlAuthorized from '../../middlewares/authorization'
import * as QuestionResolverHelper from '../../helpers/resolverHelpers/QuestionResolverHelper'
import {
  MyContext,
  CreateOwnQuestionInput,
  UpdateOwnQuestionInput
} from '../../types'
import { QuestionDocument } from '../../interfaces'

const createOwnQuestion = (_parent: object, _args: object,
  context: MyContext<{ input: CreateOwnQuestionInput }>)
  : Promise<{ question: QuestionDocument }> => {
  return QuestionResolverHelper.createOwnQuestion(context.user,
    context.validData.input)
}

const updateOwnQuestion = (_parent: object, _args: object,
  context: MyContext<{ id: string, input: UpdateOwnQuestionInput }>)
  : Promise<{ question: QuestionDocument }> => {
  return QuestionResolverHelper.updateOwnQuestion(context.user,
    context.validData)
}

const deleteOwnQuestion = (_parent: object, _args: object,
  context: MyContext<{ id: string }>) : Promise<{}> => {
  return QuestionResolverHelper.deleteOwnQuestion(context.user,
    context.validData)
}

export const Mutation = {
  createOwnQuestion: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(createOwnQuestion)))),
  updateOwnQuestion: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(updateOwnQuestion)))),
  deleteOwnQuestion: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(deleteOwnQuestion))))
}
