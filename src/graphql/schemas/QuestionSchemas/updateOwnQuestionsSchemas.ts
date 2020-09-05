/* eslint-disable max-lines */
const QuestionUpdateInput = `
"Parâmetros para atualizar uma questão do cliente logado."
input QuestionUpdateInput {
  "Regex: /^[0-9a-fA-F]{24}$/"
  _id: ID!
  "Regex: /^[0-9a-fA-F]{24}$/"
  type: ID!
  "Mínimo: 1"
  formPage: Int!
  "Posição dentro da página. Mínimo 0"
  position: Int!
  config: QuestionConfigInput!
}
`;

const UpdateOwnQuestionsInput = `
"Parâmetros para atualizar um array de questões do cliente logado."
input UpdateOwnQuestionsInput {
  "Regex: /^[0-9a-fA-F]{24}$/"
  form: ID!
  "Array de questões"
  questions: [QuestionUpdateInput!]!
}
`;

const UpdateOwnQuestionsType = `
"Resposta da mutation que atualiza um array de questões do cliente logado"
type UpdateOwnQuestions {
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 610          |    403     | Token inválido                                              |
  | 611          |    401     | Cabeçalho de autorização inválido                           |
  | 700          |    404     | Usuário não encontrado                                      |
  | 620          |    403     | Este usuário não possui permissão para esta ação            |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 711          |    404     | Cliente não encontrado                                      |
  | 721          |    404     | Pesquisa não encontrada                                     |
  | 731          |    404     | Tipo de questão não encontrado                              |
  | 751          |    404     | Questão não encontrada                                      |
  """
  error: MyError
}
`;

const updateOwnQuestionsMutation = `
"Atualiza uma array de questões do cliente logado. APENAS PARA ('client')"
updateOwnQuestions(input: UpdateOwnQuestionsInput!): UpdateOwnQuestions!
`;

export const types = `
${UpdateOwnQuestionsType}
`;

export const inputs = `
${QuestionUpdateInput}
${UpdateOwnQuestionsInput}
`;

export const Mutation = updateOwnQuestionsMutation;
