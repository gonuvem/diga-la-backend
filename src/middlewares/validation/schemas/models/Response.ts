import Joi from '@hapi/joi'

import { arraySchema, idSchema, dateSchema, basicStringSchema } from '../baseSchemas'
import { JoiSchemaMap } from '../../../../types'
import { AnswerAndQuestion, ResponseInterface } from '../../../../interfaces'

const AnswerSchema: JoiSchemaMap<AnswerAndQuestion['answer']> = {
  checkBox: arraySchema(idSchema),
  date: arraySchema(dateSchema),
  dropDown: arraySchema(idSchema),
  email: basicStringSchema,
  imageChoice: arraySchema(idSchema),
  link: basicStringSchema,
  longText: basicStringSchema,
  matrix: arraySchema(idSchema),
  nps: Joi.number(),
  number: Joi.number(),
  phone: basicStringSchema,
  radioButton: arraySchema(idSchema),
  shortText: basicStringSchema,
  slider: Joi.number(),
  sortList: arraySchema(idSchema)
}

export const AnswerAndQuestionSchema: JoiSchemaMap<AnswerAndQuestion> = {
  question: idSchema,
  answer: Joi.object(AnswerSchema)
}

export const Response: JoiSchemaMap<ResponseInterface> = {
  form: idSchema,
  answersAndQuestions: arraySchema(Joi.object(AnswerAndQuestionSchema)
    .required())
}
