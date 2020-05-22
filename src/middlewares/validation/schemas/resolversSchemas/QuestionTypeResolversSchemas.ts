import Joi from '@hapi/joi'

import {
  createSchema
} from '../baseSchemas'
import { QuestionType } from '../models/QuestionType'
import {
  JoiSchemaMap,
  CreateQuestionTypeInput
} from '../../../../types'

const createKeys: JoiSchemaMap<CreateQuestionTypeInput> = {
  kind: QuestionType.kind.required(),
  alias: QuestionType.alias.required(),
  name: QuestionType.name.required(),
  cover: QuestionType.cover.required(),
  description: QuestionType.description.required()
}
const create = createSchema(Joi.object().keys(createKeys))

export default {
  createQuestionType: create
}
