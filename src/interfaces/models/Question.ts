import { Document } from 'mongoose'

import { QuestionTypeAlias } from '../../enums'
import { ID } from '../../types'
import { FormDocument } from './Form'
import { QuestionTypeDocument } from './QuestionType'

export interface NumberConfig {
  hasMaxMinLimit: boolean,
  maxValue?: number,
  minValue?: number,
  incValue?: number
}

export interface AnswerOption {
  text: string,
  image?: string
}

export interface CheckBoxConfig {
  hasHorizontalAlignment: boolean,
  hasRandomResponsesOrder: boolean,
  answerOptions: AnswerOption[]
}

export interface EmailConfig {
  hasValidation: boolean
}

export interface PhoneConfig {
  hasValidation: boolean
}

export interface LinkConfig {
  hasValidation: boolean
}

export interface ImageChoiceConfig {
  isMultipleChoice: boolean,
  maxChoices?: number,
  hasRandomResponsesOrder: boolean,
  answerOptions: AnswerOption[]
}

export interface ShortTextConfig {
  placeholder?: string,
  hasLimitedChars: boolean,
  maxChars?: number
}

export interface NPSConfig {
  canDisplayLabels: boolean,
  leftLabel?: string,
  rightLabel?: string,
  canStartAtZero: boolean,
  escale: string
}

export interface DateConfig {
  isDateRequired: boolean,
  dateFormat?: string,
  isTimeRequired: boolean,
  timeFormat?: string,
  canCaptureInterval: boolean
}

export interface DropDownConfig {
  hasRandomResponsesOrder: boolean,
  answerOptions: AnswerOption[]
}

export interface MatrixConfig {
  isMultipleChoice: boolean,
  rowsLabels: string[],
  colsLabels: string[],
  answerOptions: AnswerOption[][]
}

export interface SliderConfig {
  minValue: number,
  minLabel?: string,
  maxValue: number,
  maxLabel?: string,
  incValue: number,
  canHideValue: boolean
}

export interface LongTextConfig {
  placeholder?: string,
  hasLimitedChars: boolean,
  maxChars?: number
}

export interface RadioButtonConfig {
  hasHorizontalAlignment: boolean,
  hasRandomResponsesOrder: boolean,
  answerOptions: AnswerOption[]
}

export interface SortListConfig {
  hasRandomResponsesOrder: boolean,
  answerOptions: AnswerOption[]
}

export interface QuestionConfig {
  name: string,
  description?: string,
  isRequired: boolean,
  [QuestionTypeAlias.CheckBox]?: CheckBoxConfig,
  [QuestionTypeAlias.Date]?: DateConfig,
  [QuestionTypeAlias.DropDown]?: DropDownConfig,
  [QuestionTypeAlias.Email]?: EmailConfig,
  [QuestionTypeAlias.ImageChoice]?: ImageChoiceConfig,
  [QuestionTypeAlias.Link]?: LinkConfig,
  [QuestionTypeAlias.LongText]?: LongTextConfig,
  [QuestionTypeAlias.Matrix]?: MatrixConfig,
  [QuestionTypeAlias.NPS]?: NPSConfig,
  [QuestionTypeAlias.Number]?: NumberConfig,
  [QuestionTypeAlias.Phone]?: PhoneConfig,
  [QuestionTypeAlias.RadioButton]?: RadioButtonConfig,
  [QuestionTypeAlias.ShortText]?: ShortTextConfig,
  [QuestionTypeAlias.Slider]?: SliderConfig,
  [QuestionTypeAlias.SortList]?: SortListConfig
}

export interface QuestionInterface {
  form: Partial<FormDocument> | ID,
  type: Partial<QuestionTypeDocument> | ID,
  formPage: number,
  position: number,
  config: QuestionConfig
}

export interface QuestionDocument extends QuestionInterface, Document {}
