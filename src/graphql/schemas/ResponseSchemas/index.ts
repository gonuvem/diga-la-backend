import * as listOwnResponsesSchemas from './listOwnResponsesSchemas'
import * as readOwnResponseSchemas from './readOwnResponseSchemas'
import * as submitResponseSchemas from './submitResponseSchemas'

const AnswerType = `
"Conteúdo da resposta de acordo com tipo de questão"
type Answer {
  "Array de IDs de opções de resposta (AnswerOption._id)"
  checkBox: [ID!]
  "Array de datas. Obs.: Um array porque pode ser um intervalo."
  date: [Date!]
  "Array de IDs de opções de resposta (AnswerOption._id)"
  dropDown: [ID!]
  "Input do email"
  email: String
  "Array de IDs de opções de resposta (AnswerOption._id)"
  imageChoice: [ID!]
  "Input do link"
  link: String
  "Input do texto longo"
  longText: String
  "Array de IDs de opções de resposta (AnswerOption._id)"
  matrix: [ID!]
  "Número escolhido. Obs.: Por enquanto está inteiro."
  nps: Int
  "Número escolhido. Obs.: Por enquanto está inteiro."
  number: Int
  "Input do telefone"
  phone: String
  "Array de IDs de opções de resposta (AnswerOption._id)"
  radioButton: [ID!]
  "Input do texto curto"
  shortText: String
  "Número escolhido. Obs.: Por enquanto está inteiro."
  slider: Int
  "Array de IDs de opções de resposta (AnswerOption._id)"
  sortList: [ID!]
}
`
const AnswerAndQuestionType = `
"Resposta e questão associada"
type AnswerAndQuestion {
  "Questão da resposta"
  question: Question!
  "Conteúdo da resposta"
  answer: Answer!
}
`

const ResponseType = `
"Tipo de Resposta"
type Response {
  "Id"
  _id: ID!
  "Formulário ao qual a resposta está vinculada"
  form: Form!
  "Array com conteúdo das respostas e questões associadas"
  answersAndQuestions: [AnswerAndQuestion!]!
  "Data de criação"
  createdAt: Date!
  "Data de atualização"
  updatedAt: Date!
}
`

export const enums = `
`

export const types = `
${AnswerType}
${AnswerAndQuestionType}
${ResponseType}
${listOwnResponsesSchemas.types}
${readOwnResponseSchemas.types}
${submitResponseSchemas.types}
`

export const inputs = `
${submitResponseSchemas.inputs}
`

export const Query = `
${listOwnResponsesSchemas.Query}
${readOwnResponseSchemas.Query}
`

export const Mutation = `
${submitResponseSchemas.Mutation}
`
