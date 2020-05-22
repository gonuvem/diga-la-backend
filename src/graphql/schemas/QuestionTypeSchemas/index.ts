import * as createQuestionTypeSchemas from './createQuestionTypeSchemas'
import * as updateQuestionTypeSchemas from './updateQuestionTypeSchemas'
import * as deleteQuestionTypeSchemas from './deleteQuestionTypeSchemas'

const QuestionTypeKindEnum = `
"Classificação de um Tipo de Questão"
enum QuestionTypeKind {
  "Básica"
  basic
  "Avançada"
  advanced
}
`

const QuestionTypeAliasEnum = `
"Apelido de um Tipo de Questão"
enum QuestionTypeAlias {
  "Número"
  number
  "Múltipla escolha"
  checkBox
  "E-mail"
  email
  "Telefone"
  phone
  "Link"
  link
  "Escolha entre imagens"
  imageChoice
  "Texto curto"
  shortText
  "NPS"
  nps
  "Data e hora"
  date
  "Dropdown"
  dropDown
  "Matriz de escolhas"
  matrix
  "Slider"
  slider
  "Texto longo"
  longText
  "Escolha única"
  radioButton
  "Ordenar respostas"
  sortList
}
`

const QuestionTypeType = `
"Tipo de Questão"
type QuestionType {
  "Id"
  _id: ID!
  "Classificação"
  kind: QuestionTypeKind!
  "Apelido"
  alias: QuestionTypeAlias!
  "Nome"
  name: String!
  "Link da imagem de capa"
  cover: String!
  "Descrição"
  description: String!
  "Data de criação"
  createdAt: Date!
  "Data de atualização"
  updatedAt: Date!
}
`

export const enums = `
${QuestionTypeKindEnum}
${QuestionTypeAliasEnum}
`

export const types = `
${QuestionTypeType}
${createQuestionTypeSchemas.types}
${updateQuestionTypeSchemas.types}
${deleteQuestionTypeSchemas.types}
`

export const inputs = `
${createQuestionTypeSchemas.inputs}
${updateQuestionTypeSchemas.inputs}
`

export const Query = `
`

export const Mutation = `
${createQuestionTypeSchemas.Mutation}
${updateQuestionTypeSchemas.Mutation}
${deleteQuestionTypeSchemas.Mutation}
`
