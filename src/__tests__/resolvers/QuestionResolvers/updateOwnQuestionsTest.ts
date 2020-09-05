/* eslint-disable max-lines-per-function */
import app from '../../../app';
import * as utils from '../../utils';
import * as helpers from '../../helpers';
import Factory from '../../../factories';
import * as err from '../../../middlewares/errorHandling/errors';
import { Role, QuestionTypeAlias } from '../../../enums';
import {
  QuestionDocument,
  FormDocument,
  QuestionTypeDocument,
} from '../../../interfaces';
import * as gqlFieldsQuery from '../../gqlFieldsQuery';
import * as gqlInputs from '../../gqlInputs';
import { UpdateOwnQuestionsInput, QuestionUpdateInput } from '../../../types';
import { Types } from 'mongoose';

const resolver = 'updateOwnQuestions';

let setupData: helpers.SetupTaskResult;

const fakeId = Types.ObjectId().toHexString();

const createInput = gqlInputs.createInputUpdateOwnQuestions;

const createQuery = (input: UpdateOwnQuestionsInput): string => `
mutation {
  ${resolver}(input: ${createInput(input)}) {
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`;

const baseRequest = utils.baseGqlRequest(app, createQuery);

type Ents = {
  form: FormDocument;
  types: QuestionTypeDocument[];
  token: string;
  questions: QuestionDocument[];
};
const createEnts = async (): Promise<Ents> => {
  const { client, user, token } = await helpers.createClientUserAndToken();

  const [form, type1, type2, type3] = await Promise.all([
    helpers.createForm({ body: { client: client._id } }),
    helpers.createQuestionType({ body: { alias: QuestionTypeAlias.CheckBox } }),
    helpers.createQuestionType({ body: { alias: QuestionTypeAlias.NPS } }),
    helpers.createQuestionType({ body: { alias: QuestionTypeAlias.Number } }),
  ]);

  const [question1, question2, question3] = await Promise.all([
    helpers.createQuestion({ body: { form: form._id, type: type1._id } }),
    helpers.createQuestion({ body: { form: form._id, type: type2._id } }),
    helpers.createQuestion({ body: { form: form._id, type: type3._id } }),
  ]);

  client.user = user;

  form.client = client;

  const questions = [question1, question2, question3];

  return { form, types: [type1, type2, type3], token, questions };
};

const createBody = (
  form = fakeId,
  questions: QuestionUpdateInput[] = []
): UpdateOwnQuestionsInput => {
  let qs: QuestionUpdateInput[] = [];
  if (!(questions && questions.length)) {
    qs = Factory.buildList('Question', 3);
  }
  return {
    form,
    questions: qs,
  };
};

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask();
  });

  const body = createBody();
  utils.testIsGqlAuthenticated(
    app,
    resolver,
    createQuery(body as UpdateOwnQuestionsInput)
  );

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client,
  ]);

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest(body, setupData[role].token).then(
        utils.expectGqlError(err.USER_NOT_ALLOWED, resolver)
      );
    });
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest(body, setupData[role].token).then(response => {
        expect(response.status).not.toBe(403);
      });
    });
  }

  let ents: Ents;
  test('404 Form not found', async () => {
    ents = await createEnts();

    const body = createBody();

    const bodyWithTypesCorrect = {
      form: body.form,
      questions: ents.questions,
    };

    return baseRequest(bodyWithTypesCorrect, ents.token).then(
      utils.expectGqlError(err.FORM_NOT_FOUND, resolver)
    );
  });

  test('404 Question Type not found', () => {
    const body = createBody(ents.form._id);

    const bodyWithTypesWrong = {
      form: body.form,
      questions: ents.questions.map((question, i) => ({
        ...question.toObject(),
        type: body.questions[i].type,
      })),
    };

    return baseRequest(bodyWithTypesWrong, ents.token).then(
      utils.expectGqlError(err.QUESTION_TYPE_NOT_FOUND, resolver)
    );
  });

  test('200 Questions updated', () => {
    const { form, questions, token, types } = ents;

    const body = createBody(form._id);

    const bodyWithTypesCorrect = {
      form: form._id,
      questions: body.questions.map((question, i) => {
        return {
          ...question,
          _id: questions[i]._id,
          type: types[i]._id,
        };
      }),
    };

    return baseRequest(bodyWithTypesCorrect, token).then(response => {
      expect(response.body.data[resolver].error).toBeNull();
    });
  });

  afterAll(async () => {
    await helpers.dropCollections([
      'User',
      'Question',
      'Client',
      'Form',
      'QuestionType',
    ]);
  });
};
