import { Document } from 'mongoose'

import { Role, QuestionTypeAlias, QuestionTypeKind } from '../enums'

export interface UserInterface {
  /** Nome completo */
  name: string,
  email: string,
  password: string,
  roles: Role[],
  renewPasswordCode?: string
}

export interface UserDocument extends UserInterface, Document {}

export interface ClientInterface {
  user: UserDocument
}

export interface ClientDocument extends ClientInterface, Document {}

export interface FormConfig {
  name: string,
  description?: string,
  beginDate?: Date,
  endDate?: Date,
  hasLimitedResponses: boolean,
  maxResponses?: number,
  isTotemMode: boolean,
  canDisplayProgressBar: boolean,
  progressBarType?: string,
  canAllowMultipleSubmissions: boolean
}

export interface FormStyle {
  background?: string,
  logo?: string,
  headerText?: string,
  hasLogoInHeader: boolean,
  headerBackground?: string,
  footerText?: string,
  footerBackground?: string
}

export interface FormInterface {
  client: ClientDocument,
  isActive: boolean,
  config: FormConfig,
  style: FormStyle
}

export interface FormDocument extends FormInterface, Document {}

export interface QuestionTypeInterface {
  kind: QuestionTypeKind,
  alias: QuestionTypeAlias,
  name: string,
  cover: string,
  description: string
}

export interface QuestionTypeDocument extends QuestionTypeInterface, Document {}

export interface NumberConfig {
  hasMaxMinLimit: boolean,
  maxValue?: number,
  minValue?: number,
  incValue?: number
}

export interface CheckBoxConfig {
  hasHorizontalAlignment: boolean,
  hasRandomResponsesOrder: boolean,
  options: string[]
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

export interface ImageChoiceOptions {
  name: string,
  image: string
}

export interface ImageChoiceConfig {
  isMultipleChoice: boolean,
  maxChoices?: number,
  hasRandomResponsesOrder: boolean,
  options: ImageChoiceOptions[]
}

export interface ShortTextConfig {
  placeholder: string,
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
  options: string[]
}

export interface MatrixConfig {
  isMultipleChoice: boolean,
  options: string[][]
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
  placeholder: string,
  hasLimitedChars: boolean,
  maxChars?: number
}

export interface RadioButtonConfig {
  hasHorizontalAlignment: boolean,
  hasRandomResponsesOrder: boolean,
  options: string[]
}

export interface QuestionConfig {
  name: string,
  description: string,
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
}

export interface QuestionInterface {
  form: FormDocument,
  type: QuestionTypeDocument,
  formPage: number,
  config: QuestionConfig
}

export interface QuestionDocument extends QuestionInterface, Document {}

export interface AnswerAndQuestion {
  question: QuestionDocument,
  answer: any
}

export interface ResponseInterface {
  form: FormDocument,
  answersAndQuestions: AnswerAndQuestion[]
}

export interface ResponseDocument extends ResponseInterface, Document {}
