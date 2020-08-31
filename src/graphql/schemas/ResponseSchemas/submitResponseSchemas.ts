const AnswerInput = `
input AnswerInput {
  "Array de IDs de opções de resposta (AnswerOption._id)"
  checkBox: [ID!]
  "Array de datas. Obs.: Um array porque pode ser um intervalo."
  date: [Date!]
  "Array de IDs de opções de resposta (AnswerOption._id)"
  dropDown: [ID!]
  "Mínimo: 1 caracter"
  email: String
  "Array de IDs de opções de resposta (AnswerOption._id)"
  imageChoice: [ID!]
  "Mínimo: 1 caracter"
  link: String
  "Mínimo: 1 caracter"
  longText: String
  "Array de arrays com posições de linha e coluna. Ex.: [[0,1],[1,2],[2,2]]"
  matrix: [[Int!]!]
  "Número escolhido. Obs.: Por enquanto está inteiro."
  nps: Int
  "Número escolhido. Obs.: Por enquanto está inteiro."
  number: Int
  "Mínimo: 1 caracter"
  phone: String
  "Array de IDs de opções de resposta (AnswerOption._id)"
  radioButton: [ID!]
  "Mínimo: 1 caracter"
  shortText: String
  "Número escolhido. Obs.: Por enquanto está inteiro."
  slider: Int
  "Array de IDs de opções de resposta (AnswerOption._id)"
  sortList: [ID!]
}
`;

const AnswerAndQuestionInput = `
input AnswerAndQuestionInput {
  question: ID!
  answer: AnswerInput!
}
`;
const SubmitResponseInput = `
"Parâmetros para envio de resposta"
input SubmitResponseInput {
  form: ID!
  answersAndQuestions: [AnswerAndQuestionInput!]!
}
`;

const SubmitResponseType = `
"Resposta da mutation que envia resposta"
type SubmitResponse {
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 610          |    403     | Token inválido                                              |
  | 611          |    401     | Cabeçalho de autorização inválido                           |
  | 700          |    404     | Usuário não encontrado                                      |
  | 620          |    403     | Este usuário não possui permissão para esta ação            |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  """
  error: MyError
}
`;

const submitResponseMutation = `
"Envia resposta."
submitResponse(input: SubmitResponseInput!): SubmitResponse!
`;

export const types = SubmitResponseType;

export const inputs = `
${AnswerInput}
${AnswerAndQuestionInput}
${SubmitResponseInput}
`;

export const Mutation = submitResponseMutation;
