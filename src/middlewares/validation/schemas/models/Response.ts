import Joi from '@hapi/joi'

import { arraySchema, idSchema } from '../baseSchemas'

export const AnswerAndQuestion = {
  question: idSchema,
  answer: Joi.any()
}

export const Response = {
  form: idSchema,
  answersAndQuestions: arraySchema(Joi.object(AnswerAndQuestion).required())
}
