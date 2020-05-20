const DeleteOwnFormType = `
"Resposta da mutation que deleta pesquisa do cliente logado"
type DeleteOwnForm {
  """
  | internalCode | statusCode | message/Descrição                                                       |
  | :----------- | :--------: | ----------------------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back.             |
  | 610          |    403     | Token inválido                                                          |
  | 611          |    401     | Cabeçalho de autorização inválido                                       |
  | 700          |    404     | Usuário não encontrado                                                  |
  | 620          |    403     | Este usuário não possui permissão para esta ação                        |
  | 630          |    400     | Erro na validação. Veja error.message                                   |
  | 711          |    404     | Cliente não encontrado                                                  |
  | 721          |    404     | Pesquisa não encontrada                                                 |
  | 722          |    422     | Essa pesquisa não pode ser deletada pois está em uso por outros objetos |
  """
  error: MyError
}
`

const deleteOwnFormMutation = `
"Deleta pesquisa do cliente logado. APENAS PARA ('client')"
deleteOwnForm(id: ID!): DeleteOwnForm!
`

export const types = DeleteOwnFormType

export const Mutation = deleteOwnFormMutation
