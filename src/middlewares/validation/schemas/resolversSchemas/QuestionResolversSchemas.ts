import Joi from '@hapi/joi'

import {
  createSchema,
  updateSchema,
  removeSchema
} from '../baseSchemas'
import { Question } from '../models/Question'
import {
  JoiSchemaMap,
  CreateOwnQuestionInput,
  UpdateOwnQuestionInput
} from '../../../../types'

const createOwnKeys: JoiSchemaMap<CreateOwnQuestionInput> = {
  form: Question.form.required(),
  type: Question.type.required(),
  formPage: Question.formPage.required(),
  config: Question.config.required()
}
const createOwn = createSchema(Joi.object().keys(createOwnKeys))

const updateOwnKeys: JoiSchemaMap<UpdateOwnQuestionInput> = {
  formPage: Question.formPage.optional(),
  config: Question.config.optional()
}
const updateOwn = updateSchema(Joi.object().keys(updateOwnKeys)
  .or('formPage', 'config'))

const removeOwn = removeSchema

export default {
  createOwnQuestion: createOwn,
  updateOwnQuestion: updateOwn,
  deleteOwnQuestion: removeOwn
}
