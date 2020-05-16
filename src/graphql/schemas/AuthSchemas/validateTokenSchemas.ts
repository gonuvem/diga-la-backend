const ValidateTokenType = `
"Validação de um token"
type ValidateToken {
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 610          |    403     | Token inválido                                              |
  """
  error: MyError
}
`

const validateTokenMutation = `
"Valida um token"
validateToken(
  "Mínimo: 1 caracter"
  token: String!
): ValidateToken!
`

export const types = `
${ValidateTokenType}
`

export const Mutation = `
${validateTokenMutation}
`
