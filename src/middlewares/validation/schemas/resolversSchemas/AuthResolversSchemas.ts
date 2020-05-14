import Joi from '@hapi/joi'

import { User } from '../models/User'

const login = Joi.object().keys({
  email: User.email.required(),
  password: User.password.required()
})

export default {
  login
}
