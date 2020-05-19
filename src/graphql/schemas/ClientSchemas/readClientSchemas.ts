const ReadClientType = `
"Resposta da query que detalha um cliente"
type ReadClient {
  "Cliente consultado"
  client: Client
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
  """
  error: MyError
}
`

const readClientQuery = `
"Detalha um cliente. APENAS PARA ('dev')"
readClient(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!
): ReadClient!
`

export const types = ReadClientType

export const Query = readClientQuery
