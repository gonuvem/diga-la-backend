import Joi from '@hapi/joi'

import { User } from '../models/User'
import { LoginParams, JoiSchemaMap } from '../../../../types'

const loginKeys: JoiSchemaMap<LoginParams> = {
  email: User.email.required(),
  password: User.password.required()
}

const login = Joi.object<LoginParams>().keys(loginKeys)

export default {
  login
}
