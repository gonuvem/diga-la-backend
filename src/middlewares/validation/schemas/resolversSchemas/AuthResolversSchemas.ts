import Joi from '@hapi/joi'

import { User } from '../models/User'
import { basicStringSchema } from '../baseSchemas'
import {
  LoginParams,
  JoiSchemaMap,
  ValidateTokenParams,
  ForgotPasswordParams,
  RenewPasswordParams
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

const forgotPasswordKeys: JoiSchemaMap<ForgotPasswordParams> = {
  email: User.email.required()
}
const forgotPassword = Joi.object<ForgotPasswordParams>()
  .keys(forgotPasswordKeys)

const renewPasswordKeys: JoiSchemaMap<RenewPasswordParams> = {
  email: User.email.required(),
  password: User.password.required(),
  code: User.renewPasswordCode.required()
}
const renewPassword = Joi.object<RenewPasswordParams>()
  .keys(renewPasswordKeys)

export default {
  login,
  validateToken,
  forgotPassword,
  renewPassword
}
