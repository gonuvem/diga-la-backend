import Joi from '@hapi/joi';

import {
  createSchema,
  updateSchema,
  removeSchema,
  listSchema,
  readSchema,
  arraySchema,
  idSchema,
} from '../baseSchemas';
import { Question } from '../models/Question';
import {
  JoiSchemaMap,
  CreateOwnQuestionInput,
  UpdateOwnQuestionInput,
  QuestionInput,
  CreateOwnQuestionsInput,
  UpdateOwnQuestionsInput,
  QuestionUpdateInput,
} from '../../../../types';

const createOwnKeys: JoiSchemaMap<CreateOwnQuestionInput> = {
  form: Question.form.required(),
  type: Question.type.required(),
  formPage: Question.formPage.required(),
  config: Question.config.required(),
};
const createOwn = createSchema(Joi.object().keys(createOwnKeys));

const updateOwnKeys: JoiSchemaMap<UpdateOwnQuestionInput> = {
  position: Question.position.optional(),
  config: Question.config.optional(),
};
const updateOwn = updateSchema(
  Joi.object().keys(updateOwnKeys).or('formPage', 'position', 'config')
);

const removeOwn = removeSchema;

const sortFields = ['position'];
const defaultField = 'position';
const filters = {
  form: Question.form.required(),
  formPage: Question.formPage.optional(),
};

const listOwn = listSchema(sortFields, defaultField, filters);

const readOwn = readSchema;

const question: JoiSchemaMap<QuestionInput> = {
  type: Question.type.required(),
  formPage: Question.formPage.required(),
  position: Question.position.required(),
  config: Question.config.required(),
};

const createOwnQuestionsKeys: JoiSchemaMap<CreateOwnQuestionsInput> = {
  form: Question.form.required(),
  questions: arraySchema(Joi.object(question).required()).required(),
};
const createOwnQuestions = createSchema(
  Joi.object().keys(createOwnQuestionsKeys)
);

const questionUpdate: JoiSchemaMap<QuestionUpdateInput> = {
  _id: idSchema.required(),
  type: Question.type.required(),
  formPage: Question.formPage.required(),
  position: Question.position.required(),
  config: Question.config.required(),
};

const updateOwnQuestionsKeys: JoiSchemaMap<UpdateOwnQuestionsInput> = {
  form: Question.form.required(),
  questions: arraySchema(Joi.object(questionUpdate).required()).required(),
};
const updateOwnQuestions = createSchema(
  Joi.object().keys(updateOwnQuestionsKeys)
);

export default {
  createOwnQuestion: createOwn,
  updateOwnQuestion: updateOwn,
  deleteOwnQuestion: removeOwn,
  listOwnQuestions: listOwn,
  readOwnQuestion: readOwn,
  createOwnQuestions,
  updateOwnQuestions,
};
