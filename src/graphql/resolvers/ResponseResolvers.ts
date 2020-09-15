import { wrapGqlAsyncFunc } from '../../middlewares/errorHandling/errorHelper';
import validateGqlRequest from '../../middlewares/validation';
import isGqlAuthenticated from '../../middlewares/authentication';
import isGqlAuthorized from '../../middlewares/authorization';
import * as ResponseResolverHelper from '../../helpers/resolverHelpers/ResponseResolverHelper';
import {
  MyContext,
  ListOwnResponsesParams,
  ListResponsesResponse,
  SubmitResponseInput,
  AnswersAndQuestionsDataLoader,
} from '../../types';
import {
  ResponseDocument,
  AnswerAndQuestion,
  ChartData,
} from '../../interfaces';

const listOwnResponses = (
  _parent: object,
  _args: object,
  context: MyContext<ListOwnResponsesParams>
): Promise<ListResponsesResponse> => {
  return ResponseResolverHelper.listOwnResponses(
    context.user,
    context.validData
  );
};

const readOwnResponse = (
  _parent: object,
  _args: object,
  context: MyContext<{ id: string }>
): Promise<{ response: ResponseDocument }> => {
  return ResponseResolverHelper.readOwnResponse(
    context.user,
    context.validData
  );
};

const submitResponse = (
  _parent: object,
  _args: object,
  context: MyContext<{ input: SubmitResponseInput }>
): Promise<{}> => {
  return ResponseResolverHelper.submitResponse(context.validData.input);
};

const getResponseAnswersAndQuestions = (
  response: ResponseDocument,
  _args: object,
  context: MyContext<object, AnswersAndQuestionsDataLoader>
): Promise<AnswerAndQuestion[]> => {
  const { loaders } = context;

  const { answersAndQuestionsLoader } = loaders;

  return answersAndQuestionsLoader.load(response);
};

const getChartsData = (
  _parent: object,
  _args: object,
  context: MyContext<{ id: string }>
): Promise<{ data: ChartData[] }> => {
  return ResponseResolverHelper.getChartsData(context.user, context.validData);
};

export const Query = {
  listOwnResponses: wrapGqlAsyncFunc(
    isGqlAuthenticated(isGqlAuthorized(validateGqlRequest(listOwnResponses)))
  ),
  readOwnResponse: wrapGqlAsyncFunc(
    isGqlAuthenticated(isGqlAuthorized(validateGqlRequest(readOwnResponse)))
  ),
  getChartsData: wrapGqlAsyncFunc(
    isGqlAuthenticated(isGqlAuthorized(validateGqlRequest(getChartsData)))
  ),
};

export const Mutation = {
  submitResponse: wrapGqlAsyncFunc(validateGqlRequest(submitResponse)),
};

export const references = {
  Response: {
    form: ResponseResolverHelper.getResponseForm,
    answersAndQuestions: getResponseAnswersAndQuestions,
  },
};
