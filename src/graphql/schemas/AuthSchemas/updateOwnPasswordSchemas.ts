const UpdateOwnPasswordType = `
"Resposta da mutation que atualiza a senha do usuário logado"
type UpdateOwnPassword {
  "Usuário atualizado"
  user: BasicUser
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 610          |    403     | Token inválido                                              |
  | 611          |    401     | Cabeçalho de autorização inválido                           |
  | 700          |    404     | Usuário não encontrado                                      |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 709          |    403     | Senha incorreta                                             |
  """
  error: MyError
}
`

const updateOwnPasswordMutation = `
"Mutation que atualiza a senha do usuário logado"
updateOwnPassword(
  "Mínimo: 6 caracteres"
  oldPassword: String!
  "Mínimo: 6 caracteres"
  newPassword: String!
): UpdateOwnPassword!
`

export const types = UpdateOwnPasswordType

export const Mutation = updateOwnPasswordMutation
