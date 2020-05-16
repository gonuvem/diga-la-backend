const ForgotPasswordType = `
"Resposta do envio do código de recuperação"
type ForgotPassword {
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 700          |    404     | Usuário não encontrado                                      |
  | 910          |    500     | Ocorreu um erro no envio do email                           |
  """
  error: MyError
}
`

const forgotPasswordMutation = `
"Envia um código de recuperação de senha"
forgotPassword(
  "Formato de email válido"
  email: String!
): ForgotPassword!
`

export const types = `
${ForgotPasswordType}
`

export const Mutation = `
${forgotPasswordMutation}
`
