/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  UpdateOwnProfileInput,
  CreateClientInput,
  UpdateClientInput,
  CreateOwnFormInput,
  UpdateOwnFormInput,
  CreateQuestionTypeInput,
  UpdateQuestionTypeInput,
  CreateOwnQuestionInput,
  UpdateOwnQuestionInput
} from '../types'
import { createArrayInput, createStringValue } from './gqlTestHelper'
import { AnswerOption } from '../interfaces'

export const createInputUpdateOwnProfile = (input: UpdateOwnProfileInput)
: string => `{
  name: "${input.name}",
  email: "${input.email}"
}`

export const createInputCreateClient = (input: CreateClientInput): string => `{
  name: "${input.name}",
  email: "${input.email}",
  password: "${input.password}"
}`

export const createInputUpdateClient = (input: UpdateClientInput): string => `{
  name: "${input.name}",
  email: "${input.email}"
}`

const createInputFormConfig = (config: CreateOwnFormInput['config'])
: string => `{
  name: "${config.name}",
  description: "${config.description}",
  beginDate: "${config.beginDate.toISOString()}",
  endDate: "${config.endDate.toISOString()}",
  hasLimitedResponses: ${config.hasLimitedResponses},
  maxResponses: ${config.maxResponses},
  isTotemMode: ${config.isTotemMode},
  canDisplayProgressBar: ${config.canDisplayProgressBar},
  progressBarType: "${config.progressBarType}",
  canAllowMultipleSubmissions: ${config.canAllowMultipleSubmissions}
}`

const createInputFormStyle = (style: CreateOwnFormInput['style'])
: string => `{
  background: "${style.background}",
  logo: "${style.logo}",
  headerText: "${style.headerText}",
  hasLogoInHeader: ${style.hasLogoInHeader},
  headerBackground: "${style.headerBackground}",
  footerText: "${style.footerText}",
  footerBackground: "${style.footerBackground}"
}`

export const createInputCreateOwnForm = (input: CreateOwnFormInput)
: string => `{
  isActive: ${input.isActive},
  config: ${createInputFormConfig(input.config)},
  style: ${createInputFormStyle(input.style)}
}`

export const createInputUpdateOwnForm = (input: UpdateOwnFormInput)
: string => `{
  isActive: ${input.isActive},
  config: ${createInputFormConfig(input.config)},
  style: ${createInputFormStyle(input.style)}
}`

export const createInputCreateQuestionType = (input: CreateQuestionTypeInput)
: string => `{
  kind: ${input.kind},
  alias: ${input.alias},
  name: "${input.name}",
  cover: "${input.cover}",
  description: "${input.description}"
}`

export const createInputUpdateQuestionType = (input: UpdateQuestionTypeInput)
: string => `{
  kind: ${input.kind},
  alias: ${input.alias},
  name: "${input.name}",
  cover: "${input.cover}",
  description: "${input.description}"
}`

const createInputAnswerOption = (input: AnswerOption): string => `{
  text: "${input.text}",
  image: "${input.image}",
}`

const createInputCheckBoxConfig = (input: CreateOwnQuestionInput['config']['checkBox'])
: string => `{
  hasHorizontalAlignment: ${input.hasHorizontalAlignment},
  hasRandomResponsesOrder: ${input.hasRandomResponsesOrder},
  answerOptions: ${createArrayInput(input.answerOptions, createInputAnswerOption)},
}`

const createInputDateConfig = (input: CreateOwnQuestionInput['config']['date'])
: string => `{
  isDateRequired: ${input.isDateRequired},
  dateFormat: "${input.dateFormat}",
  isTimeRequired: ${input.isTimeRequired},
  timeFormat: "${input.timeFormat}",
  canCaptureInterval: ${input.canCaptureInterval}
}`

const createInputDropDownConfig = (input: CreateOwnQuestionInput['config']['dropDown'])
: string => `{
  hasRandomResponsesOrder: ${input.hasRandomResponsesOrder},
  answerOptions: ${createArrayInput(input.answerOptions, createInputAnswerOption)},
}`

const createInputEmailConfig = (input: CreateOwnQuestionInput['config']['email'])
: string => `{
  hasValidation: ${input.hasValidation}
}`

const createInputImageChoiceConfig = (input: CreateOwnQuestionInput['config']['imageChoice'])
: string => `{
  isMultipleChoice: ${input.isMultipleChoice},
  maxChoices: ${input.maxChoices},
  hasRandomResponsesOrder: ${input.hasRandomResponsesOrder},
  answerOptions: ${createArrayInput(input.answerOptions, createInputAnswerOption)},
}`

const createInputLinkConfig = (input: CreateOwnQuestionInput['config']['link'])
: string => `{
  hasValidation: ${input.hasValidation}
}`

const createInputLongTextConfig = (input: CreateOwnQuestionInput['config']['longText'])
: string => `{
  placeholder: "${input.placeholder}",
  hasLimitedChars: ${input.hasLimitedChars}
  maxChars: ${input.maxChars}
}`

const createInputMatrixConfig = (input: CreateOwnQuestionInput['config']['matrix'])
: string => {
  return `{
    isMultipleChoice: ${input.isMultipleChoice},
    rowsLabels: ${createArrayInput(input.rowsLabels, createStringValue)},
    colsLabels: ${createArrayInput(input.colsLabels, createStringValue)},
    answerOptions: ${input.answerOptions.map(v =>
      createArrayInput(v, createInputAnswerOption)).slice(1, -1)}
  }`
}

const createInputNPSConfig = (input: CreateOwnQuestionInput['config']['nps'])
: string => `{
  canDisplayLabels: ${input.canDisplayLabels},
  leftLabel: "${input.leftLabel}",
  rightLabel: "${input.rightLabel}",
  canStartAtZero: ${input.canStartAtZero},
  escale: "${input.escale}",
}`

const createInputNumberConfig = (input: CreateOwnQuestionInput['config']['number'])
: string => `{
  hasMaxMinLimit: ${input.hasMaxMinLimit},
  maxValue: ${input.maxValue},
  minValue: ${input.minValue},
  incValue: ${input.incValue},
}`

const createInputPhoneConfig = (input: CreateOwnQuestionInput['config']['phone'])
: string => `{
  hasValidation: ${input.hasValidation}
}`

const createInputRadioButtonConfig = (input: CreateOwnQuestionInput['config']['radioButton'])
: string => `{
  hasHorizontalAlignment: ${input.hasHorizontalAlignment},
  hasRandomResponsesOrder: ${input.hasRandomResponsesOrder},
  answerOptions: ${createArrayInput(input.answerOptions, createInputAnswerOption)},
}`

const createInputShortTextConfig = (input: CreateOwnQuestionInput['config']['shortText'])
: string => `{
  placeholder: "${input.placeholder}",
  hasLimitedChars: ${input.hasLimitedChars},
  maxChars: ${input.maxChars},
}`

const createInputSliderConfig = (input: CreateOwnQuestionInput['config']['slider'])
: string => `{
  minValue: ${input.minValue},
  minLabel: "${input.minLabel}",
  maxValue: ${input.maxValue},
  maxLabel: "${input.maxLabel}",
  incValue: ${input.incValue},
  canHideValue: ${input.canHideValue},
}`

const createInputSortListConfig = (input: CreateOwnQuestionInput['config']['sortList'])
: string => `{
  hasRandomResponsesOrder: ${input.hasRandomResponsesOrder},
  answerOptions: ${createArrayInput(input.answerOptions, createInputAnswerOption)},
}`

const createInputQuestionConfig = (input: CreateOwnQuestionInput['config'])
: string => `{
  name: "${input.name}",
  description: "${input.description}",
  isRequired: ${input.isRequired},
  checkBox: ${createInputCheckBoxConfig(input.checkBox)},
  date: ${createInputDateConfig(input.date)},
  dropDown: ${createInputDropDownConfig(input.dropDown)},
  email: ${createInputEmailConfig(input.email)},
  imageChoice: ${createInputImageChoiceConfig(input.imageChoice)},
  link: ${createInputLinkConfig(input.link)},
  longText: ${createInputLongTextConfig(input.longText)},
  matrix: ${createInputMatrixConfig(input.matrix)},
  nps: ${createInputNPSConfig(input.nps)},
  number: ${createInputNumberConfig(input.number)},
  phone: ${createInputPhoneConfig(input.phone)},
  radioButton: ${createInputRadioButtonConfig(input.radioButton)},
  shortText: ${createInputShortTextConfig(input.shortText)},
  slider: ${createInputSliderConfig(input.slider)},
  sortList: ${createInputSortListConfig(input.sortList)},
}`

export const createInputCreateOwnQuestion = (input: CreateOwnQuestionInput)
: string => `{
  form: "${input.form}",
  type: "${input.type}",
  formPage: ${input.formPage},
  config: ${createInputQuestionConfig(input.config)}
}`

export const createInputUpdateOwnQuestion = (input: UpdateOwnQuestionInput)
: string => `{
  position: ${input.position},
  config: ${createInputQuestionConfig(input.config)}
}`
