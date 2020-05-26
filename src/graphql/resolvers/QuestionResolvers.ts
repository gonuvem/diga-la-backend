import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper'
import validateGqlRequest from '../../middlewares/validation'
import isGqlAuthenticated from '../../middlewares/authentication'
import isGqlAuthorized from '../../middlewares/authorization'
import * as QuestionResolverHelper from '../../helpers/resolverHelpers/QuestionResolverHelper'
import {
  MyContext,
  CreateOwnQuestionInput
} from '../../types'
import { QuestionDocument } from '../../interfaces'

const createOwnQuestion = (_parent: object, _args: object,
  context: MyContext<{ input: CreateOwnQuestionInput }>)
  : Promise<{ question: QuestionDocument }> => {
  return QuestionResolverHelper.createOwnQuestion(context.user,
    context.validData.input)
}

export const Mutation = {
  createOwnQuestion: wrapGqlAsyncFunc(isGqlAuthenticated(isGqlAuthorized(
    validateGqlRequest(createOwnQuestion))))
}
