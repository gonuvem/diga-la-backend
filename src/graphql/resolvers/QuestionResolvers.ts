import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper';
import validateGqlRequest from '../../middlewares/validation';
import isGqlAuthenticated from '../../middlewares/authentication';
import isGqlAuthorized from '../../middlewares/authorization';
import * as QuestionResolverHelper from '../../helpers/resolverHelpers/QuestionResolverHelper';
import {
  MyContext,
  CreateOwnQuestionInput,
  UpdateOwnQuestionInput,
  ListOwnQuestionsParams,
  ListQuestionsResponse,
  CreateOwnQuestionsInput,
} from '../../types';
import { QuestionDocument } from '../../interfaces';

const createOwnQuestion = (
  _parent: object,
  _args: object,
  context: MyContext<{ input: CreateOwnQuestionInput }>
): Promise<{ question: QuestionDocument }> => {
  return QuestionResolverHelper.createOwnQuestion(
    context.user,
    context.validData.input
  );
};

const updateOwnQuestion = (
  _parent: object,
  _args: object,
  context: MyContext<{ id: string; input: UpdateOwnQuestionInput }>
): Promise<{ question: QuestionDocument }> => {
  return QuestionResolverHelper.updateOwnQuestion(
    context.user,
    context.validData
  );
};

const deleteOwnQuestion = (
  _parent: object,
  _args: object,
  context: MyContext<{ id: string }>
): Promise<{}> => {
  return QuestionResolverHelper.deleteOwnQuestion(
    context.user,
    context.validData
  );
};

const listOwnQuestions = (
  _parent: object,
  _args: object,
  context: MyContext<ListOwnQuestionsParams>
): Promise<ListQuestionsResponse> => {
  return QuestionResolverHelper.listOwnQuestions(
    context.user,
    context.validData
  );
};

const readOwnQuestion = (
  _parent: object,
  _args: object,
  context: MyContext<{ id: string }>
): Promise<{ question: QuestionDocument }> => {
  return QuestionResolverHelper.readOwnQuestion(
    context.user,
    context.validData
  );
};

const createOwnQuestions = (
  _parent: object,
  _args: object,
  context: MyContext<{ input: CreateOwnQuestionsInput }>
): Promise<{ questions: QuestionDocument[] }> => {
  return QuestionResolverHelper.createOwnQuestions(
    context.user,
    context.validData.input
  );
};

export const Query = {
  listOwnQuestions: wrapGqlAsyncFunc(
    isGqlAuthenticated(isGqlAuthorized(validateGqlRequest(listOwnQuestions)))
  ),
  readOwnQuestion: wrapGqlAsyncFunc(
    isGqlAuthenticated(isGqlAuthorized(validateGqlRequest(readOwnQuestion)))
  ),
};

export const Mutation = {
  createOwnQuestion: wrapGqlAsyncFunc(
    isGqlAuthenticated(isGqlAuthorized(validateGqlRequest(createOwnQuestion)))
  ),
  updateOwnQuestion: wrapGqlAsyncFunc(
    isGqlAuthenticated(isGqlAuthorized(validateGqlRequest(updateOwnQuestion)))
  ),
  deleteOwnQuestion: wrapGqlAsyncFunc(
    isGqlAuthenticated(isGqlAuthorized(validateGqlRequest(deleteOwnQuestion)))
  ),
  createOwnQuestions: wrapGqlAsyncFunc(
    isGqlAuthenticated(isGqlAuthorized(validateGqlRequest(createOwnQuestions)))
  ),
};

export const references = {
  Question: {
    form: QuestionResolverHelper.getQuestionForm,
    type: QuestionResolverHelper.getQuestionType,
  },
};
