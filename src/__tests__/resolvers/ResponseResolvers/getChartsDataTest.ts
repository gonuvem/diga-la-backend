/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Types } from 'mongoose';

import app from '../../../app';
import * as utils from '../../utils';
import * as helpers from '../../helpers';
import * as err from '../../../middlewares/errorHandling/errors';
import { QuestionTypeAlias, Role } from '../../../enums';
import * as gqlFieldsQuery from '../../gqlFieldsQuery';
import { ResponseDocument, FormDocument, ChartData } from '../../../interfaces';

const resolver = 'getChartsData';

const fakeId = Types.ObjectId().toHexString();

let setupData: helpers.SetupTaskResult;

const createQuery = ({ id }: { id: string }): string => `
query {
  ${resolver}(id: "${id}") {
    data ${gqlFieldsQuery.chartsDataFieldsQuery}
    error ${gqlFieldsQuery.errorFieldsQuery}
  }
}
`;

const createResponse = helpers.createResponse;

type Ents = {
  token: string;
  objectsByForm: ResponseDocument[];
  forms: FormDocument[];
};
const createEnts = async (): Promise<Ents> => {
  const { token, client, user } = await helpers.createClientUserAndToken();
  client.user = user;

  const [
    form1,
    form2,
    form3,
    radioButtonType,
    checkBoxType,
    npsType,
    dateType,
  ] = await Promise.all([
    helpers.createForm({ body: { client: client._id } }),
    helpers.createForm({ body: { client: client._id } }),
    helpers.createForm({ body: { client: client._id } }),
    helpers.createQuestionType({
      body: { alias: QuestionTypeAlias.RadioButton },
    }),
    helpers.createQuestionType({
      body: { alias: QuestionTypeAlias.CheckBox },
    }),
    helpers.createQuestionType({
      body: { alias: QuestionTypeAlias.NPS },
    }),
    helpers.createQuestionType({
      body: { alias: QuestionTypeAlias.Date },
    }),
  ]);
  form1.client = client;
  form2.client = client;
  form3.client = client;

  const [
    radioButtonQuestion,
    checkBoxQuestion,
    npsQuestion,
    dateQuestion,
  ] = await Promise.all([
    helpers.createQuestion({
      body: { form: form1._id, type: radioButtonType._id },
    }),
    helpers.createQuestion({
      body: { form: form1._id, type: checkBoxType._id },
    }),
    helpers.createQuestion({ body: { form: form1._id, type: npsType._id } }),
    helpers.createQuestion({ body: { form: form1._id, type: dateType._id } }),
  ]);
  radioButtonQuestion.form = form1;
  checkBoxQuestion.form = form1;
  npsQuestion.form = form1;
  dateQuestion.form = form1;

  radioButtonQuestion.type = radioButtonType;
  checkBoxQuestion.type = checkBoxType;
  npsQuestion.type = npsType;
  dateQuestion.type = dateType;

  const o1 = await createResponse({
    body: {
      form: form1._id,
      answersAndQuestions: [
        {
          answer: {
            radioButton: [
              radioButtonQuestion.config.radioButton.answerOptions[0]._id,
            ],
          },
          question: radioButtonQuestion._id,
        },
      ],
    },
  });
  o1.form = form1;
  o1.answersAndQuestions[0].question = radioButtonQuestion;
  const o2 = await createResponse({
    body: {
      form: form1._id,
      answersAndQuestions: [
        {
          answer: {
            radioButton: [
              radioButtonQuestion.config.radioButton.answerOptions[0]._id,
            ],
          },
          question: radioButtonQuestion._id,
        },
      ],
    },
  });
  o2.form = form1;
  o2.answersAndQuestions[0].question = radioButtonQuestion;

  const o11 = await createResponse({
    body: {
      form: form1._id,
      answersAndQuestions: [
        {
          answer: {
            checkBox: [checkBoxQuestion.config.checkBox.answerOptions[1]._id],
          },
          question: checkBoxQuestion._id,
        },
      ],
    },
  });
  o11.form = form1;
  o11.answersAndQuestions[0].question = checkBoxQuestion;

  const o12 = await createResponse({
    body: {
      form: form1._id,
      answersAndQuestions: [
        { answer: { shortText: 'Talvez' }, question: npsQuestion._id },
      ],
    },
  });
  o12.form = form1;
  o12.answersAndQuestions[0].question = npsQuestion;

  return { token, objectsByForm: [o1, o11, o12], forms: [form1, form2, form3] };
};

const baseRequest = utils.baseGqlRequest(app, createQuery);

// eslint-disable-next-line max-lines-per-function
export default (): void => {
  beforeAll(async () => {
    setupData = await helpers.setupTask();
  });

  utils.testIsGqlAuthenticated(app, resolver, createQuery({ id: fakeId }));

  const { rolesAllowed, rolesNotAllowed } = helpers.splitRolesByPermission([
    Role.Client,
  ]);

  for (const role of rolesNotAllowed) {
    test(`403 ${role} not allowed`, () => {
      return baseRequest({ id: fakeId }, setupData[role].token).then(
        utils.expectGqlError(err.USER_NOT_ALLOWED, resolver)
      );
    });
  }

  for (const role of rolesAllowed) {
    test(`Not 403 - ${role} allowed`, () => {
      return baseRequest({ id: fakeId }, setupData[role].token).then(
        response => {
          expect(response.status).not.toBe(403);
        }
      );
    });
  }

  // test('404 Form not found', async () => {
  //   await helpers.createClient({ body: { user: setupData.client.user } });
  //   return baseRequest({ id: fakeId }, setupData.client.token).then(
  //     utils.expectGqlError(err.FORM_NOT_FOUND, resolver)
  //   );
  // });

  let ents: Ents;
  test('404 Responses empty list', async () => {
    ents = await createEnts();

    return baseRequest({ id: ents.forms[1]._id }, ents.token).then(response => {
      const { data } = response.body.data[resolver];

      expect(data).toHaveLength(0);
    });
  });

  test('200 Responses found', () => {
    return baseRequest({ id: ents.forms[0]._id }, ents.token).then(response => {
      // utils.printForDocs(response.body);

      const data = response.body.data[resolver].data as ChartData[];

      expect(data).toHaveLength(3);
      const radioButton = data.find(
        question => question.name === 'Escolha única'
      );
      const checkBox = data.find(
        question => question.name === 'Múltipla Escolha'
      );
      const nps = data.find(question => question.name === 'NPS');

      expect(radioButton).toMatchObject({
        type: 'pie',
        name: 'Escolha única',
      });
      expect(radioButton.data).toHaveLength(3);
      expect(checkBox).toMatchObject({
        type: 'radar',
        name: 'Múltipla Escolha',
      });
      expect(checkBox.data).toHaveLength(3);
      expect(nps).toMatchObject({
        type: 'barRace',
        name: 'NPS',
      });
      expect(nps.data).toHaveLength(3);
    });
  });

  afterAll(async () => {
    await helpers.dropCollections([
      'Response',
      'Form',
      'User',
      'Client',
      'QuestionType',
      'Question',
    ]);
  });
};
