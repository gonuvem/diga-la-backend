import { Role } from '../enums'
import {
  UserInterface,
  UserDocument,
  ClientInterface,
  ClientDocument,
  FormDocument,
  FormInterface,
  QuestionTypeInterface,
  QuestionTypeDocument
} from '../interfaces'

export const checkUser = (expected: Partial<UserInterface>,
  received: Partial<UserDocument>): void => {
  expect(received).toMatchObject({
    name: expected.name,
    email: expected.email
  })

  received.roles.forEach((role: Role, i: number) => {
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
