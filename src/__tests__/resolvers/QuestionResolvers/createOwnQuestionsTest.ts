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
import * as checkObjects from '../../checkObjects';
import * as gqlInputs from '../../gqlInputs';
import { CreateOwnQuestionsInput, QuestionInput } from '../../../types';
import { Types } from 'mongoose';

const resolver = 'createOwnQuestions';

let setupData: helpers.SetupTaskResult;

const fakeId = Types.ObjectId().toHexString();

const createInput = gqlInputs.createInputCreateOwnQuestions;

const createQuery = (input: CreateOwnQuestionsInput): string => `
mutation {
  ${resolver}(input: ${createInput(input)}) {
    questions ${gqlFieldsQuery.questionFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}`;

const baseRequest = utils.baseGqlRequest(app, createQuery);

const checkResponse = (
  expected: CreateOwnQuestionsInput,
  received: QuestionDocument[]
): void => {
  const { questions } = expected;
  received.forEach((question, i) => {
    const expected = questions[i];
    const received = question;
    expect(received).toMatchObject({
      formPage: expected.formPage,
      position: expected.position,
    });
    checkObjects.checkQuestionConfig(expected.config, received.config);
  });
};

type Ents = {
  form: FormDocument;
  types: QuestionTypeDocument[];
  token: string;
};
const createEnts = async (): Promise<Ents> => {
  const { client, user, token } = await helpers.createClientUserAndToken();

  const [form, type1, type2, type3] = await Promise.all([
    helpers.createForm({ body: { client: client._id } }),
    helpers.createQuestionType({ body: { alias: QuestionTypeAlias.CheckBox } }),
    helpers.createQuestionType({ body: { alias: QuestionTypeAlias.NPS } }),
    helpers.createQuestionType({ body: { alias: QuestionTypeAlias.Number } }),
  ]);

  client.user = user;

  form.client = client;

  return { form, types: [type1, type2, type3], token };
};

const createBody = (
  form = fakeId,
  questions: QuestionInput[] = []
): CreateOwnQuestionsInput => {
  let qs: QuestionInput[] = [];
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
    createQuery(body as CreateOwnQuestionsInput)
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
      questions: body.questions.map((question, i) => {
        return {
          ...question,
          type: ents.types[i]._id,
        };
      }),
    };

    return baseRequest(bodyWithTypesCorrect, ents.token).then(
      utils.expectGqlError(err.FORM_NOT_FOUND, resolver)
    );
  });

  test('404 Question Type not found', () => {
    const body = createBody(ents.form._id);

    return baseRequest(body, ents.token).then(
      utils.expectGqlError(err.QUESTION_TYPE_NOT_FOUND, resolver)
    );
  });

  test('200 Questions created', () => {
    const { form, types, token } = ents;

    const body = createBody(form._id);

    const bodyWithTypesCorrect = {
      form: body.form,
      questions: body.questions.map((question, i) => {
        return {
          ...question,
          type: types[i]._id,
        };
      }),
    };

    return baseRequest(bodyWithTypesCorrect, token).then(response => {
      // utils.printForDocs(response);
      const { questions } = response.body.data[resolver] as {
        questions: QuestionDocument[];
      };

      const expected = bodyWithTypesCorrect;

      checkResponse(expected, questions);
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
