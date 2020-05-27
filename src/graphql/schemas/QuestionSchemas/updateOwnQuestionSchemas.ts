const UpdateOwnQuestionInput = `
"Parâmetros para atualizar questão do cliente logado. Pelo menos um dos campos opcionais deve ser enviado."
input UpdateOwnQuestionInput {
  "Mínimo: 0"
  position: Int
  config: QuestionConfigInput
}
`

const UpdateOwnQuestionType = `
"Resposta da mutation que atualiza questão do cliente logado"
type UpdateOwnQuestion {
  "Questão atualizada"
  question: Question
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 610          |    403     | Token inválido                                              |
  | 611          |    401     | Cabeçalho de autorização inválido                           |
  | 700          |    404     | Usuário não encontrado                                      |
  | 620          |    403     | Este usuário não possui permissão para esta ação            |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 703          |    409     | Já existe um usuário com este email                         |
  | 711          |    404     | Cliente não encontrado                                      |
  | 751          |    404     | Questão não encontrada                                      |
  """
  error: MyError
}
`

const updateOwnQuestionMutation = `
"Mutation que atualiza questão do cliente logado. APENAS PARA ('client')"
updateOwnQuestion(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!, 
  input: UpdateOwnQuestionInput!
): UpdateOwnQuestion!
`

export const types = UpdateOwnQuestionType

export const inputs = UpdateOwnQuestionInput

export const Mutation = updateOwnQuestionMutation
