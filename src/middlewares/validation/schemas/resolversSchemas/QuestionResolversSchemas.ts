import Joi from '@hapi/joi'

import {
  createSchema
} from '../baseSchemas'
import { Question } from '../models/Question'
import {
  JoiSchemaMap,
  CreateOwnQuestionInput
} from '../../../../types'

const createOwnKeys: JoiSchemaMap<CreateOwnQuestionInput> = {
  form: Question.form.required(),
  type: Question.type.required(),
  formPage: Question.formPage.required(),
  config: Question.config.required()
}
const createOwn = createSchema(Joi.object().keys(createOwnKeys))

export default {
  createOwnQuestion: createOwn
}
