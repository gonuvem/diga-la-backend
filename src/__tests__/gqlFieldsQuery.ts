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

export const questionTypeFieldsQuery = `{
  _id
  kind
  alias
  name
  cover
  description
  createdAt
  updatedAt
}`

const questionNumberConfigFieldsQuery = `{
  hasMaxMinLimit
  maxValue
  minValue
  incValue
}`

const questionAnswerOptionFieldsQuery = `{
  text
  image
}`

const questionCheckBoxConfigFieldsQuery = `{
  hasHorizontalAlignment
  hasRandomResponsesOrder
  answerOptions ${questionAnswerOptionFieldsQuery}
}`

const questionEmailConfigFieldsQuery = `{
  hasValidation
}`

const questionPhoneConfigFieldsQuery = `{
  hasValidation
}`

const questionLinkConfigFieldsQuery = `{
  hasValidation
}`

const questionImageChoiceConfigFieldsQuery = `{
  isMultipleChoice
  maxChoices
  hasRandomResponsesOrder
  answerOptions ${questionAnswerOptionFieldsQuery}
}`

const questionShortTextConfigFieldsQuery = `{
  placeholder
  hasLimitedChars
  maxChars
}`

const questionNPSConfigFieldsQuery = `{
  canDisplayLabels
  leftLabel
  rightLabel
  canStartAtZero
  escale
}`

const questionDateConfigFieldsQuery = `{
  isDateRequired
  dateFormat
  isTimeRequired
  timeFormat
  canCaptureInterval
}`

const questionDropDownConfigFieldsQuery = `{
  hasRandomResponsesOrder
  answerOptions ${questionAnswerOptionFieldsQuery}
}`

const questionMatrixConfigFieldsQuery = `{
  isMultipleChoice
  rowsLabels
  colsLabels
  answerOptions ${questionAnswerOptionFieldsQuery}
}`

const questionSliderConfigFieldsQuery = `{
  minValue
  minLabel
  maxValue
  maxLabel
  incValue
  canHideValue
}`

const questionLongTextConfigFieldsQuery = `{
  placeholder
  hasLimitedChars
  maxChars
}`

const questionRadioButtonConfigFieldsQuery = `{
  hasHorizontalAlignment
  hasRandomResponsesOrder
  answerOptions ${questionAnswerOptionFieldsQuery}
}`

const questionSortListConfigFieldsQuery = `{
  hasRandomResponsesOrder
  answerOptions ${questionAnswerOptionFieldsQuery}
}`

const questionConfigFieldsQuery = `{
  name
  description
  isRequired
  checkBox ${questionCheckBoxConfigFieldsQuery}
  date ${questionDateConfigFieldsQuery}
  dropDown ${questionDropDownConfigFieldsQuery}
  email ${questionEmailConfigFieldsQuery}
  imageChoice ${questionImageChoiceConfigFieldsQuery}
  link ${questionLinkConfigFieldsQuery}
  longText ${questionLongTextConfigFieldsQuery}
  matrix ${questionMatrixConfigFieldsQuery}
  nps ${questionNPSConfigFieldsQuery}
  number ${questionNumberConfigFieldsQuery}
  phone ${questionPhoneConfigFieldsQuery}
  radioButton ${questionRadioButtonConfigFieldsQuery}
  shortText ${questionShortTextConfigFieldsQuery}
  slider ${questionSliderConfigFieldsQuery}
  sortList ${questionSortListConfigFieldsQuery}
}`

export const questionFieldsQuery = `{
  _id
  form ${formFieldsQuery}
  type ${questionTypeFieldsQuery}
  formPage
  config ${questionConfigFieldsQuery}
  createdAt
  updatedAt
}`
