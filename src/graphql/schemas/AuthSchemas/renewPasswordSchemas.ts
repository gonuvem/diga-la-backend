const RenewPasswordType = `
"Resposta da renovação de senha"
type RenewPassword {
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 700          |    404     | Usuário não encontrado                                      |
  | 704          |    422     | Código de renovação de senha incorreto                      |
  """
  error: MyError
}
`

const renewPasswordMutation = `
"Renova a senha de um usuário"
renewPassword(
  "Formato de email válido"
  email: String!
  "Mínimo: 6 caracteres"
  password: String!
  "String hexadecimal com tamanho de 5 caracteres"
  code: String!
): RenewPassword!
`

export const types = `
${RenewPasswordType}
`

export const Mutation = `
${renewPasswordMutation}
`
