import Joi from '@hapi/joi'

import {
  createSchema
} from '../baseSchemas'
import { Form } from '../models/Form'
import {
  JoiSchemaMap,
  CreateOwnFormInput
} from '../../../../types'

const createOwnKeys: JoiSchemaMap<CreateOwnFormInput> = {
  isActive: Form.isActive.optional().default(false),
  config: Form.config.required(),
  style: Form.style.optional()
}
const createOwn = createSchema(Joi.object().keys(createOwnKeys))

export default {
  createOwnForm: createOwn
}
