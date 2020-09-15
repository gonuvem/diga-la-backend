import Joi from '@hapi/joi';

import { listSchema, idSchema, readSchema, createSchema } from '../baseSchemas';
import { Response } from '../models/Response';
import {
  JoiSchemaMap,
  ListOwnResponsesParams,
  SubmitResponseInput,
} from '../../../../types';

const sortFields = ['createdAt', '-createdAt'];
const defaultField = '-createdAt';
const filters: JoiSchemaMap<ListOwnResponsesParams> = {
  form: Response.form.required(),
  question: idSchema.optional(),
};

const listOwn = listSchema(sortFields, defaultField, filters);

const readOwn = readSchema;

const submitKeys: JoiSchemaMap<SubmitResponseInput> = {
  form: Response.form.required(),
  answersAndQuestions: Response.answersAndQuestions.required(),
};
const submit = createSchema(Joi.object().keys(submitKeys));

const getChartsData = readSchema;

export default {
  listOwnResponses: listOwn,
  readOwnResponse: readOwn,
  submitResponse: submit,
  getChartsData,
};
