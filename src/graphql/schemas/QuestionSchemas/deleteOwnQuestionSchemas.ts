const DeleteOwnQuestionType = `
"Resposta da mutation que deleta questão do cliente logado"
type DeleteOwnQuestion {
  """
  | internalCode | statusCode | message/Descrição                                                      |
  | :----------- | :--------: | ---------------------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back.            |
  | 610          |    403     | Token inválido                                                         |
  | 611          |    401     | Cabeçalho de autorização inválido                                      |
  | 700          |    404     | Usuário não encontrado                                                 |
  | 620          |    403     | Este usuário não possui permissão para esta ação                       |
  | 630          |    400     | Erro na validação. Veja error.message                                  |
  | 711          |    404     | Cliente não encontrado                                                 |
  | 751          |    404     | Questão não encontrada                                                 |
  | 752          |    422     | Essa questão não pode ser deletada pois está em uso por outros objetos |
  """
  error: MyError
}
`

const deleteOwnQuestionMutation = `
"Deleta questão do cliente logado. APENAS PARA ('client')"
deleteOwnQuestion(id: ID!): DeleteOwnQuestion!
`

export const types = DeleteOwnQuestionType

export const Mutation = deleteOwnQuestionMutation
