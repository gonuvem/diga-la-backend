/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Role } from '../enums'
import {
  UserInterface,
  UserDocument,
  ClientInterface,
  ClientDocument,
  FormDocument,
  FormInterface,
  QuestionTypeInterface,
  QuestionTypeDocument,
  QuestionInterface,
  QuestionDocument,
  AnswerOption,
  ResponseInterface,
  ResponseDocument,
  AnswerAndQuestion
} from '../interfaces'

export const checkUser = (expected: Partial<UserInterface>,
  received: Partial<UserDocument>): void => {
  expect(received).toMatchObject({
    name: expected.name,
    email: expected.email
  })

  received.roles.forEach((role: Role, i: number): void => {
    expect(role).toBe(expected.roles[i])
  })
}

export const checkClient = (expected: Partial<ClientInterface>,
  received: Partial<ClientDocument>): void => {
  checkUser(expected.user as UserInterface, received.user as UserInterface)
}

const checkFormConfig = (expected: Partial<FormInterface['config']>,
  received: Partial<FormDocument['config']>): void => {
  expect(received).toMatchObject({
    name: expected.name,
    description: expected.description,
    beginDate: expected.beginDate.toISOString(),
    endDate: expected.endDate.toISOString(),
    hasLimitedResponses: expected.hasLimitedResponses,
    maxResponses: expected.maxResponses,
    isTotemMode: expected.isTotemMode,
    canDisplayProgressBar: expected.canDisplayProgressBar,
    progressBarType: expected.progressBarType,
    canAllowMultipleSubmissions: expected.canAllowMultipleSubmissions
  })
}

const checkFormStyle = (expected: Partial<FormInterface['style']>,
  received: Partial<FormDocument['style']>): void => {
  expect(received).toMatchObject({
    background: expected.background,
    logo: expected.logo,
    headerText: expected.headerText,
    hasLogoInHeader: expected.hasLogoInHeader,
    headerBackground: expected.headerBackground,
    footerText: expected.footerText,
    footerBackground: expected.footerBackground
  })
}

export const checkForm = (expected: Partial<FormInterface>,
  received: Partial<FormDocument>): void => {
  expect(received).toMatchObject({
    isActive: expected.isActive
  })
  checkClient(expected.client as ClientInterface,
    received.client as ClientDocument)
  checkFormConfig(expected.config, received.config)
  checkFormStyle(expected.style, received.style)
}

export const checkQuestionType = (expected: Partial<QuestionTypeInterface>,
  received: Partial<QuestionTypeDocument>): void => {
  expect(received).toMatchObject({
    kind: expected.kind,
    alias: expected.alias,
    name: expected.name,
    cover: expected.cover,
    description: expected.description
  })
}

const checkQuestionNumberConfig = (expected: Partial<QuestionInterface['config']['number']>,
  received: Partial<QuestionInterface['config']['number']>): void => {
  expect(received).toMatchObject({
    hasMaxMinLimit: expected.hasMaxMinLimit,
    maxValue: expected.maxValue,
    minValue: expected.minValue,
    incValue: expected.incValue
  })
}

const checkQuestionAnswerOption = (expected: Partial<AnswerOption>,
  received: Partial<AnswerOption>): void => {
  expect(received).toMatchObject({
    text: expected.text,
    image: expected.image
  })
}

const checkQuestionCheckBoxConfig = (expected: Partial<QuestionInterface['config']['checkBox']>,
  received: Partial<QuestionInterface['config']['checkBox']>): void => {
  expect(received).toMatchObject({
    hasHorizontalAlignment: expected.hasHorizontalAlignment,
    hasRandomResponsesOrder: expected.hasRandomResponsesOrder
  })

  received.answerOptions.forEach((v, i): void => checkQuestionAnswerOption(expected.answerOptions[i], v))
}

const checkQuestionEmailConfig = (expected: Partial<QuestionInterface['config']['email']>,
  received: Partial<QuestionInterface['config']['email']>): void => {
  expect(received).toMatchObject({
    hasValidation: expected.hasValidation
  })
}

const checkQuestionPhoneConfig = (expected: Partial<QuestionInterface['config']['phone']>,
  received: Partial<QuestionInterface['config']['phone']>): void => {
  expect(received).toMatchObject({
    hasValidation: expected.hasValidation
  })
}

const checkQuestionLinkConfig = (expected: Partial<QuestionInterface['config']['link']>,
  received: Partial<QuestionInterface['config']['link']>): void => {
  expect(received).toMatchObject({
    hasValidation: expected.hasValidation
  })
}

const checkQuestionImageChoiceConfig = (expected: Partial<QuestionInterface['config']['imageChoice']>,
  received: Partial<QuestionInterface['config']['imageChoice']>): void => {
  expect(received).toMatchObject({
    isMultipleChoice: expected.isMultipleChoice,
    maxChoices: expected.maxChoices,
    hasRandomResponsesOrder: expected.hasRandomResponsesOrder
  })
  received.answerOptions.forEach((v, i): void => checkQuestionAnswerOption(expected.answerOptions[i], v))
}

const checkQuestionShortTextConfig = (expected: Partial<QuestionInterface['config']['shortText']>,
  received: Partial<QuestionInterface['config']['shortText']>): void => {
  expect(received).toMatchObject({
    placeholder: expected.placeholder,
    hasLimitedChars: expected.hasLimitedChars,
    maxChars: expected.maxChars
  })
}

const checkQuestionNPSConfig = (expected: Partial<QuestionInterface['config']['nps']>,
  received: Partial<QuestionInterface['config']['nps']>): void => {
  expect(received).toMatchObject({
    canDisplayLabels: expected.canDisplayLabels,
    leftLabel: expected.leftLabel,
    rightLabel: expected.rightLabel,
    canStartAtZero: expected.canStartAtZero,
    escale: expected.escale
  })
}

const checkQuestionDateConfig = (expected: Partial<QuestionInterface['config']['date']>,
  received: Partial<QuestionInterface['config']['date']>): void => {
  expect(received).toMatchObject({
    isDateRequired: expected.isDateRequired,
    dateFormat: expected.dateFormat,
    isTimeRequired: expected.isTimeRequired,
    timeFormat: expected.timeFormat,
    canCaptureInterval: expected.canCaptureInterval
  })
}

const checkQuestionDropDownConfig = (expected: Partial<QuestionInterface['config']['dropDown']>,
  received: Partial<QuestionInterface['config']['dropDown']>): void => {
  expect(received).toMatchObject({
    hasRandomResponsesOrder: expected.hasRandomResponsesOrder
  })
  received.answerOptions.forEach((v, i): void => checkQuestionAnswerOption(expected.answerOptions[i], v))
}

const checkQuestionMatrixConfig = (expected: Partial<QuestionInterface['config']['matrix']>,
  received: Partial<QuestionInterface['config']['matrix']>): void => {
  expect(received).toMatchObject({
    isMultipleChoice: expected.isMultipleChoice
  })
  received.rowsLabels.forEach((v, i): void => expect(expected.rowsLabels[i]).toBe(v))
  received.colsLabels.forEach((v, i): void => expect(expected.colsLabels[i]).toBe(v))
  received.answerOptions.forEach((v, i): void => {
    v.forEach((vv, j): void => {
      checkQuestionAnswerOption(expected.answerOptions[i][j], vv)
    })
  })
}

const checkQuestionSliderConfig = (expected: Partial<QuestionInterface['config']['slider']>,
  received: Partial<QuestionInterface['config']['slider']>): void => {
  expect(received).toMatchObject({
    minValue: expected.minValue,
    minLabel: expected.minLabel,
    maxValue: expected.maxValue,
    maxLabel: expected.maxLabel,
    incValue: expected.incValue,
    canHideValue: expected.canHideValue
  })
}

const checkQuestionLongTextConfig = (expected: Partial<QuestionInterface['config']['longText']>,
  received: Partial<QuestionInterface['config']['longText']>): void => {
  expect(received).toMatchObject({
    placeholder: expected.placeholder,
    hasLimitedChars: expected.hasLimitedChars,
    maxChars: expected.maxChars
  })
}

const checkQuestionRadioButtonConfig = (expected: Partial<QuestionInterface['config']['radioButton']>,
  received: Partial<QuestionInterface['config']['radioButton']>): void => {
  expect(received).toMatchObject({
    hasHorizontalAlignment: expected.hasHorizontalAlignment,
    hasRandomResponsesOrder: expected.hasRandomResponsesOrder
  })
  received.answerOptions.forEach((v, i): void => checkQuestionAnswerOption(expected.answerOptions[i], v))
}

const checkQuestionSortListConfig = (expected: Partial<QuestionInterface['config']['sortList']>,
  received: Partial<QuestionInterface['config']['sortList']>): void => {
  expect(received).toMatchObject({
    hasRandomResponsesOrder: expected.hasRandomResponsesOrder
  })
  received.answerOptions.forEach((v, i): void => checkQuestionAnswerOption(expected.answerOptions[i], v))
}

const checkQuestionConfig = (expected: Partial<QuestionInterface['config']>,
  received: Partial<QuestionDocument['config']>): void => {
  expect(received).toMatchObject({
    name: expected.name,
    description: expected.description,
    isRequired: expected.isRequired
  })
  if (received.checkBox) checkQuestionCheckBoxConfig(expected.checkBox, received.checkBox)
  if (received.date) checkQuestionDateConfig(expected.date, received.date)
  if (received.dropDown) checkQuestionDropDownConfig(expected.dropDown, received.dropDown)
  if (received.email) checkQuestionEmailConfig(expected.email, received.email)
  if (received.imageChoice) checkQuestionImageChoiceConfig(expected.imageChoice, received.imageChoice)
  if (received.link) checkQuestionLinkConfig(expected.link, received.link)
  if (received.longText) checkQuestionLongTextConfig(expected.longText, received.longText)
  if (received.matrix) checkQuestionMatrixConfig(expected.matrix, received.matrix)
  if (received.nps) checkQuestionNPSConfig(expected.nps, received.nps)
  if (received.number) checkQuestionNumberConfig(expected.number, received.number)
  if (received.phone) checkQuestionPhoneConfig(expected.phone, received.phone)
  if (received.radioButton) checkQuestionRadioButtonConfig(expected.radioButton, received.radioButton)
  if (received.shortText) checkQuestionShortTextConfig(expected.shortText, received.shortText)
  if (received.slider) checkQuestionSliderConfig(expected.slider, received.slider)
  if (received.sortList) checkQuestionSortListConfig(expected.sortList, received.sortList)
}

export const checkQuestion = (expected: Partial<QuestionInterface>,
  received: Partial<QuestionDocument>): void => {
  checkForm(expected.form as FormInterface, received.form as FormInterface)
  checkQuestionType(expected.type as QuestionTypeInterface,
     received.type as QuestionTypeInterface)
  expect(received).toMatchObject({
    formPage: expected.formPage,
    position: expected.position
  })
  checkQuestionConfig(expected.config, received.config)
}

const checkAnswer = (expected: Partial<AnswerAndQuestion['answer']>,
  received: Partial<AnswerAndQuestion['answer']>): void => {
  const checkArrayOfIds = (expectedIds: string[], receivedIds: string[])
    : void => {
    receivedIds.forEach((id, i) =>
      expect(expectedIds[i].toString()).toBe(id.toString()))
  }
  const checkArrayOfDates = (expectedIds: Date[], receivedIds: Date[])
    : void => {
    receivedIds.forEach((id, i) =>
      expect(expectedIds[i].toISOString()).toBe(id.toISOString()))
  }
  if (received.checkBox) checkArrayOfIds(expected.checkBox, received.checkBox)
  if (received.date) checkArrayOfDates(expected.date, received.date)
  if (received.dropDown) checkArrayOfIds(expected.dropDown, received.dropDown)
  if (received.email) expect(expected.email).toBe(received.email)
  if (received.imageChoice) checkArrayOfIds(expected.imageChoice, received.imageChoice)
  if (received.link) expect(expected.link).toBe(received.link)
  if (received.longText) expect(expected.longText).toBe(received.longText)
  if (received.matrix) checkArrayOfIds(expected.matrix, received.matrix)
  if (received.nps) expect(expected.nps).toBe(received.nps)
  if (received.number) expect(expected.number).toBe(received.number)
  if (received.phone) expect(expected.phone).toBe(received.phone)
  if (received.radioButton) checkArrayOfIds(expected.radioButton, received.radioButton)
  if (received.shortText) expect(expected.shortText).toBe(received.shortText)
  if (received.slider) expect(expected.slider).toBe(received.slider)
  if (received.sortList) checkArrayOfIds(expected.sortList, received.sortList)
}

const checkAnswerAndQuestion = (expected: Partial<AnswerAndQuestion>,
  received: Partial<AnswerAndQuestion>): void => {
  checkQuestion(expected.question as QuestionInterface,
     received.question as QuestionInterface)
  checkAnswer(expected.answer, received.answer)
}

export const checkResponse = (expected: Partial<ResponseInterface>,
  received: Partial<ResponseDocument>): void => {
  checkForm(expected.form as FormInterface, received.form as FormInterface)
  received.answersAndQuestions.forEach((v, i) =>
    checkAnswerAndQuestion(expected.answersAndQuestions[i], v))
}
