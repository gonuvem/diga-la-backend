import {
  UpdateOwnProfileInput,
  CreateClientInput,
  UpdateClientInput,
  CreateOwnFormInput,
  UpdateOwnFormInput,
  CreateQuestionTypeInput
} from '../types'

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
