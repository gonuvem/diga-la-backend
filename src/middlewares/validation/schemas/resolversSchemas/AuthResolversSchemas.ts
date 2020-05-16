import Joi from '@hapi/joi'

import { User } from '../models/User'
import { basicStringSchema } from '../baseSchemas'
import {
  LoginParams,
  JoiSchemaMap,
  ValidateTokenParams
} from '../../../../types'

const loginKeys: JoiSchemaMap<LoginParams> = {
  email: User.email.required(),
  password: User.password.required()
}

const login = Joi.object<LoginParams>().keys(loginKeys)

const validateTokenKeys: JoiSchemaMap<ValidateTokenParams> = {
  token: basicStringSchema.required()
}

const validateToken = Joi.object().keys(validateTokenKeys)

export default {
  login,
  validateToken
}
