/* eslint-disable max-lines */
const QuestionInput = `
"Parâmetros para criar uma questão do cliente logado."
input QuestionInput {
  "Regex: /^[0-9a-fA-F]{24}$/"
  type: ID!
  "Mínimo: 1"
  formPage: Int!
  "Posição dentro da página. Mínimo 0"
  position: Int!
  config: QuestionConfigInput!
}
`;

const CreateOwnQuestionsInput = `
"Parâmetros para criar um array de questões do cliente logado."
input CreateOwnQuestionsInput {
  "Regex: /^[0-9a-fA-F]{24}$/"
  form: ID!
  "Array de questões"
  questions: [QuestionInput!]!
}
`;

const CreateOwnQuestionsType = `
"Resposta da mutation que cria um array de questões do cliente logado"
type CreateOwnQuestions {
  "Questões criadas"
  questions: [Question]
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
  """
  error: MyError
}
`;

const createOwnQuestionsMutation = `
"Cria uma array de questões do cliente logado. APENAS PARA ('client')"
createOwnQuestions(input: CreateOwnQuestionsInput!): CreateOwnQuestions!
`;

export const types = `
${QuestionInput}
${CreateOwnQuestionsType}
`;

export const inputs = `
${CreateOwnQuestionsInput}
`;

export const Mutation = createOwnQuestionsMutation;
