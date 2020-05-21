export const errorFieldsQuery = `{
  message
  statusCode
  internalCode
  internalError {
    name
    message
    stack
  }
}`

export const userFieldsQuery = `{
  _id
  name
  email
  roles
}`

export const clientFieldsQuery = `{
  _id
  user ${userFieldsQuery}
  createdAt
  updatedAt
}`

const formConfigFieldsQuery = `{
  name
  description
  beginDate
  endDate
  hasLimitedResponses
  maxResponses
  isTotemMode
  canDisplayProgressBar
  progressBarType
  canAllowMultipleSubmissions
}`

const formStyleFieldsQuery = `{
  background
  logo
  headerText
  hasLogoInHeader
  headerBackground
  footerText
  footerBackground
}`

export const formFieldsQuery = `{
  _id
  client ${clientFieldsQuery}
  isActive
  config ${formConfigFieldsQuery}
  style ${formStyleFieldsQuery}
  numResponses
  createdAt
  updatedAt
}`
