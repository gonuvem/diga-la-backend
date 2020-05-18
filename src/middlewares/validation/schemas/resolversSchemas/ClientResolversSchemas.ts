import Joi from '@hapi/joi'

import {
  createSchema,
  updateSchema,
  removeSchema
} from '../baseSchemas'
import { User } from '../models/User'
import {
  JoiSchemaMap,
  CreateClientInput,
  UpdateClientInput
} from '../../../../types'

const createKeys: JoiSchemaMap<CreateClientInput> = {
  name: User.name.required(),
  password: User.password.required(),
  email: User.email.required()
}
const create = createSchema(Joi.object().keys(createKeys))

const updateKeys: JoiSchemaMap<UpdateClientInput> = {
  name: User.name.optional(),
  email: User.email.optional()
}
const update = updateSchema(Joi.object().keys(updateKeys).or('name', 'email'))

const remove = removeSchema

export default {
  createClient: create,
  updateClient: update,
  deleteClient: remove
}
