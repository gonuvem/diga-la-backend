import Joi from '@hapi/joi'

import {
  createSchema,
  updateSchema,
  removeSchema,
  listSchema
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
  position: Question.position.optional(),
  config: Question.config.optional()
}
const updateOwn = updateSchema(Joi.object().keys(updateOwnKeys)
  .or('formPage', 'position', 'config'))

const removeOwn = removeSchema

const sortFields = ['position']
const defaultField = 'position'
const filters = {
  form: Question.form.required(),
  formPage: Question.formPage.optional()
}

const listOwn = listSchema(sortFields, defaultField, filters)

export default {
  createOwnQuestion: createOwn,
  updateOwnQuestion: updateOwn,
  deleteOwnQuestion: removeOwn,
  listOwnQuestions: listOwn
}
