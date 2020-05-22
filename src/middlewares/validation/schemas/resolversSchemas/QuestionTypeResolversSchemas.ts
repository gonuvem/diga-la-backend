import Joi from '@hapi/joi'

import {
  createSchema,
  updateSchema,
  removeSchema,
  listSchema
} from '../baseSchemas'
import { QuestionType } from '../models/QuestionType'
import {
  JoiSchemaMap,
  CreateQuestionTypeInput,
  UpdateQuestionTypeInput
} from '../../../../types'

const createKeys: JoiSchemaMap<CreateQuestionTypeInput> = {
  kind: QuestionType.kind.required(),
  alias: QuestionType.alias.required(),
  name: QuestionType.name.required(),
  cover: QuestionType.cover.required(),
  description: QuestionType.description.required()
}
const create = createSchema(Joi.object().keys(createKeys))

const updateKeys: JoiSchemaMap<UpdateQuestionTypeInput> = {
  kind: QuestionType.kind.optional(),
  alias: QuestionType.alias.optional(),
  name: QuestionType.name.optional(),
  cover: QuestionType.cover.optional(),
  description: QuestionType.description.optional()
}
const update = updateSchema(Joi.object().keys(updateKeys)
  .or('kind', 'alias', 'name', 'cover', 'description'))

const remove = removeSchema

const sortFields = ['-name', 'name', '-createdAt', 'createdAt']
const defaultField = 'name'
const filters = {
  kind: QuestionType.kind.optional(),
  alias: QuestionType.alias.optional()
}

const list = listSchema(sortFields, defaultField, filters)

export default {
  createQuestionType: create,
  updateQuestionType: update,
  deleteQuestionType: remove,
  listQuestionTypes: list
}
