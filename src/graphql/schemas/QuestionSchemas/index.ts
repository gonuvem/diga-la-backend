/* eslint-disable max-lines */
import * as createOwnQuestionSchemas from './createOwnQuestionSchemas'
import * as updateOwnQuestionSchemas from './updateOwnQuestionSchemas'
import * as deleteOwnQuestionSchemas from './deleteOwnQuestionSchemas'

const NumberConfigType = `
"Número"
type NumberConfig {
  "Limitar máximo e mínimo"
  hasMaxMinLimit: Boolean!
  "Número máximo"
  maxValue: Int
  "Número mínimo"
  minValue: Int
  "Valor do incrementador"
  incValue: Int
}
`

const AnswerOptionType = `
"Opção de resposta"
type AnswerOption {
  _id: ID!
  "Texto"
  text: String!
  "Link da imagem"
  image: String
}
`

const CheckBoxConfigType = `
"Checkbox - escolha múltipla"
type CheckBoxConfig {
  "Alinhamento horizontal"
  hasHorizontalAlignment: Boolean!
  "Ordem das respostas aleatória"
  hasRandomResponsesOrder: Boolean!
  "Opções"
  answerOptions: [AnswerOption!]!
}
`

const EmailConfigType = `
"Email"
type EmailConfig {
  "Ativar validação de email"
  hasValidation: Boolean!
}
`

const PhoneConfigType = `
"Telefone"
type PhoneConfig {
  "Ativar validação de telefone"
  hasValidation: Boolean!
}
`

const LinkConfigType = `
"Link"
type LinkConfig {
  "Ativar validação de link"
  hasValidation: Boolean!
}
`

const ImageChoiceConfigType = `
"Escolha entre imagens"
type ImageChoiceConfig {
  "Escolha Múltipla"
  isMultipleChoice: Boolean!
  "Limite de escolhas"
  maxChoices: Int
  "Ordem das respostas aleatória"
  hasRandomResponsesOrder: Boolean!
  "Opções"
  answerOptions: [AnswerOption!]!
}
`

const ShortTextConfigType = `
"Texto curto"
type ShortTextConfig {
  "Texto de exemplo"
  placeholder: String
  "Caracteres limitados"
  hasLimitedChars: Boolean!
  "Limite de caracteres"
  maxChars: Int
}
`

const NPSConfigType = `
"NPS"
type NPSConfig {
  "Mostrar legendas"
  canDisplayLabels: Boolean!
  "Legenda lado esquerdo"
  leftLabel: String
  "Legenda lado direito"
  rightLabel: String
  "Começar no zero"
  canStartAtZero: Boolean!
  "Escala"
  escale: String!
}
`

const DateConfigType = `
"Data e hora"
type DateConfig {
  "Exigir data"
  isDateRequired: Boolean!
  "Formato da data"
  dateFormat: String
  "Exigir tempo"
  isTimeRequired: Boolean!
  "Formato do tempo"
  timeFormat: String
  "Capturar intervalo"
  canCaptureInterval: Boolean!
}
`

const DropDownConfigType = `
"Dropdown"
type DropDownConfig {
  "Ordem das respostas aleatória"
  hasRandomResponsesOrder: Boolean!
  "Opções"
  answerOptions: [AnswerOption!]!
}
`

const MatrixConfigType = `
"Matriz de escolhas"
type MatrixConfig {
  "Escolha Múltipla"
  isMultipleChoice: Boolean!
  "Rótulos das linhas"
  rowsLabels: [String]!
  "Rótulos das colunas"
  colsLabels: [String]!
  "Opções"
  answerOptions: [[AnswerOption!]!]!
}
`

const SliderConfigType = `
"Slider"
type SliderConfig {
  "Limite inferior"
  minValue: Int!
  "Legenda lado esquerdo"
  minLabel: String
  "Limite superior"
  maxValue: Int!
  "Legenda lado direito"
  maxLabel: String
  "Intervalo"
  incValue: Int!
  "Ocultar valor no seletor"
  canHideValue: Boolean!
}
`

const LongTextConfigType = `
"Texto longo"
type LongTextConfig {
  "Texto de exemplo"
  placeholder: String
  "Caracteres limitados"
  hasLimitedChars: Boolean!
  "Limite de caracteres"
  maxChars: Int
}
`

const RadioButtonConfigType = `
"Radiobutton - escolha única"
type RadioButtonConfig {
  "Alinhamento horizontal"
  hasHorizontalAlignment: Boolean!
  "Ordem das respostas aleatória"
  hasRandomResponsesOrder: Boolean!
  "Opções"
  answerOptions: [AnswerOption!]!
}
`

const SortListConfigType = `
"Ordenar respostas"
type SortListConfig {
  "Ordem das respostas aleatória"
  hasRandomResponsesOrder: Boolean!
  "Opções"
  answerOptions: [AnswerOption!]!
}
`

const QuestionConfigType = `
"Configuração de Questão"
type QuestionConfig {
  "Nome"
  name: String!
  "Descrição"
  description: String
  "Indica se é de resposta obrigatória"
  isRequired: Boolean!
  checkBox: CheckBoxConfig
  date: DateConfig
  dropDown: DropDownConfig
  email: EmailConfig
  imageChoice: ImageChoiceConfig
  link: LinkConfig
  longText: LongTextConfig
  matrix: MatrixConfig
  nps: NPSConfig
  number: NumberConfig
  phone: PhoneConfig
  radioButton: RadioButtonConfig
  shortText: ShortTextConfig
  slider: SliderConfig
  sortList: SortListConfig
}
`
const QuestionType = `
"Questão"
type Question {
  "Id"
  _id: ID!
  "Pesquisa"
  form: Form!
  "Tipo de questão"
  type: QuestionType!
  "Página"
  formPage: Int!
  "Configuração"
  config: QuestionConfig!
  "Data de criação"
  createdAt: Date!
  "Data de atualização"
  updatedAt: Date!
}
`

export const types = `
${NumberConfigType}
${AnswerOptionType}
${CheckBoxConfigType}
${EmailConfigType}
${PhoneConfigType}
${LinkConfigType}
${ImageChoiceConfigType}
${ShortTextConfigType}
${NPSConfigType}
${DateConfigType}
${DropDownConfigType}
${MatrixConfigType}
${SliderConfigType}
${LongTextConfigType}
${RadioButtonConfigType}
${SortListConfigType}
${QuestionConfigType}
${QuestionType}
${createOwnQuestionSchemas.types}
${updateOwnQuestionSchemas.types}
${deleteOwnQuestionSchemas.types}
`

export const inputs = `
${createOwnQuestionSchemas.inputs}
${updateOwnQuestionSchemas.inputs}
`

export const Query = `
`

export const Mutation = `
${createOwnQuestionSchemas.Mutation}
${updateOwnQuestionSchemas.Mutation}
${deleteOwnQuestionSchemas.Mutation}
`
