import Joi from '@hapi/joi'

import { QuestionTypeAlias } from '../../../../enums'
import {
  arraySchema,
  idSchema,
  basicStringSchema,
  booleanSchema,
  integerSchema
} from '../baseSchemas'

export const NumberConfig = {
  hasMaxMinLimit: booleanSchema,
  maxValue: integerSchema,
  minValue: integerSchema,
  incValue: integerSchema.min(1)
}

export const AnswerOption = {
  text: basicStringSchema,
  image: basicStringSchema
}

const answerOptionsSchema = arraySchema(Joi.object(AnswerOption).required())

export const CheckBoxConfig = {
  hasHorizontalAlignment: booleanSchema,
  hasRandomResponsesOrder: booleanSchema,
  answerOptions: answerOptionsSchema
}

export const EmailConfig = {
  hasValidation: booleanSchema
}

export const PhoneConfig = {
  hasValidation: booleanSchema
}

export const LinkConfig = {
  hasValidation: booleanSchema
}

export const ImageChoiceConfig = {
  isMultipleChoice: booleanSchema,
  maxChoices: integerSchema.min(1),
  hasRandomResponsesOrder: booleanSchema,
  answerOptions: answerOptionsSchema
}

export const ShortTextConfig = {
  placeholder: basicStringSchema,
  hasLimitedChars: booleanSchema,
  maxChars: integerSchema.min(1)
}

export const NPSConfig = {
  canDisplayLabels: booleanSchema,
  leftLabel: basicStringSchema,
  rightLabel: basicStringSchema,
  canStartAtZero: booleanSchema,
  escale: basicStringSchema
}

export const DateConfig = {
  isDateRequired: booleanSchema,
  dateFormat: basicStringSchema,
  isTimeRequired: booleanSchema,
  timeFormat: basicStringSchema,
  canCaptureInterval: booleanSchema
}

export const DropDownConfig = {
  hasRandomResponsesOrder: booleanSchema,
  answerOptions: answerOptionsSchema
}

export const MatrixConfig = {
  isMultipleChoice: booleanSchema,
  rowsLabels: arraySchema(basicStringSchema.required()),
  colsLabels: arraySchema(basicStringSchema.required()),
  answerOptions: arraySchema(answerOptionsSchema.required())
}

export const SliderConfig = {
  minValue: integerSchema,
  minLabel: basicStringSchema,
  maxValue: integerSchema,
  maxLabel: basicStringSchema,
  incValue: integerSchema.min(1),
  canHideValue: booleanSchema
}

export const LongTextConfig = {
  placeholder: basicStringSchema,
  hasLimitedChars: booleanSchema,
  maxChars: integerSchema.min(1)
}

export const RadioButtonConfig = {
  hasHorizontalAlignment: booleanSchema,
  hasRandomResponsesOrder: booleanSchema,
  answerOptions: answerOptionsSchema
}

export const QuestionConfig = {
  name: basicStringSchema,
  description: basicStringSchema,
  isRequired: booleanSchema,
  [QuestionTypeAlias.CheckBox]: Joi.object(CheckBoxConfig),
  [QuestionTypeAlias.Date]: Joi.object(DateConfig),
  [QuestionTypeAlias.DropDown]: Joi.object(DropDownConfig),
  [QuestionTypeAlias.Email]: Joi.object(EmailConfig),
  [QuestionTypeAlias.ImageChoice]: Joi.object(ImageChoiceConfig),
  [QuestionTypeAlias.Link]: Joi.object(LinkConfig),
  [QuestionTypeAlias.LongText]: Joi.object(LongTextConfig),
  [QuestionTypeAlias.Matrix]: Joi.object(MatrixConfig),
  [QuestionTypeAlias.NPS]: Joi.object(NPSConfig),
  [QuestionTypeAlias.Number]: Joi.object(NumberConfig),
  [QuestionTypeAlias.Phone]: Joi.object(PhoneConfig),
  [QuestionTypeAlias.RadioButton]: Joi.object(RadioButtonConfig),
  [QuestionTypeAlias.ShortText]: Joi.object(ShortTextConfig),
  [QuestionTypeAlias.Slider]: Joi.object(SliderConfig)
}

export const Question = {
  form: idSchema,
  type: idSchema,
  formPage: integerSchema.min(1),
  config: QuestionConfig
}
