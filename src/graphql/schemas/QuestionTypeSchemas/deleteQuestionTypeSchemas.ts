const DeleteQuestionTypeType = `
"Resposta da mutation que deleta um Tipo de Questão"
type DeleteQuestionType {
  """
  | internalCode | statusCode | message/Descrição                                                              |
  | :----------- | :--------: | ------------------------------------------------------------------------------ |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back.                    |
  | 610          |    403     | Token inválido                                                                 |
  | 611          |    401     | Cabeçalho de autorização inválido                                              |
  | 700          |    404     | Usuário não encontrado                                                         |
  | 620          |    403     | Este usuário não possui permissão para esta ação                               |
  | 630          |    400     | Erro na validação. Veja error.message                                          |
  | 731          |    404     | Tipo de questão não encontrado                                                 |
  | 732          |    422     | Esse tipo de questão não pode ser deletado pois está em uso por outros objetos |
  """
  error: MyError
}
`

const deleteQuestionTypeMutation = `
"Deleta um Tipo de Questão. APENAS PARA ('dev')"
deleteQuestionType(id: ID!): DeleteQuestionType!
`

export const types = DeleteQuestionTypeType

export const Mutation = deleteQuestionTypeMutation
