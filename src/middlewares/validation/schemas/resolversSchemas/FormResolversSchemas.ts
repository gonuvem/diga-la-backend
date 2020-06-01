import Joi from '@hapi/joi'

import {
  createSchema,
  updateSchema,
  removeSchema,
  listSchema,
  readSchema
} from '../baseSchemas'
import { Form } from '../models/Form'
import {
  JoiSchemaMap,
  CreateOwnFormInput,
  UpdateOwnFormInput
} from '../../../../types'

const createOwnKeys: JoiSchemaMap<CreateOwnFormInput> = {
  isActive: Form.isActive.optional().default(false),
  config: Form.config.required(),
  style: Form.style.optional()
}
const createOwn = createSchema(Joi.object().keys(createOwnKeys))

const updateOwnKeys: JoiSchemaMap<UpdateOwnFormInput> = {
  isActive: Form.isActive.optional(),
  config: Form.config.optional(),
  style: Form.style.optional()
}
const updateOwn = updateSchema(Joi.object().keys(updateOwnKeys)
  .or('isActive', 'config', 'style'))

const removeOwn = removeSchema

const sortFields = ['-config.name', 'config.name', '-createdAt', 'createdAt']
const defaultField = '-createdAt'
const filters = {}

const listOwn = listSchema(sortFields, defaultField, filters)

const readOwn = readSchema

const show = readSchema

export default {
  createOwnForm: createOwn,
  updateOwnForm: updateOwn,
  deleteOwnForm: removeOwn,
  listOwnForms: listOwn,
  readOwnForm: readOwn,
  showForm: show
}
