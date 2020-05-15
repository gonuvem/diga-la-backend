import Joi from '@hapi/joi'

import { arraySchema, idSchema } from '../baseSchemas'
import { JoiSchemaMap } from '../../../../types'
import { AnswerAndQuestion, ResponseInterface } from '../../../../interfaces'

export const AnswerAndQuestionSchema: JoiSchemaMap<AnswerAndQuestion> = {
  question: idSchema,
  answer: Joi.any()
}

export const Response: JoiSchemaMap<ResponseInterface> = {
  form: idSchema,
  answersAndQuestions: arraySchema(Joi.object(AnswerAndQuestionSchema)
    .required())
}
