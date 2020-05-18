import Joi from '@hapi/joi'

import {
  createSchema
} from '../baseSchemas'
import { User } from '../models/User'
import {
  JoiSchemaMap,
  CreateClientInput
} from '../../../../types'

const createKeys: JoiSchemaMap<CreateClientInput> = {
  name: User.name.required(),
  password: User.password.required(),
  email: User.email.required()
}
const create = createSchema(Joi.object().keys(createKeys))

export default {
  createClient: create
}
