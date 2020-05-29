const ReadOwnResponseType = `
"Resposta da query que detalha resposta do cliente logado"
type ReadOwnResponse {
  "Resposta consultada"
  response: Response
  """
  | internalCode | statusCode | message/Descrição                                            |
  | :----------- | :--------: | ------------------------------------------------------------ |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back.  |
  | 610          |    403     | Token inválido                                               |
  | 611          |    401     | Cabeçalho de autorização inválido                            |
  | 700          |    404     | Usuário não encontrado                                       |
  | 620          |    403     | Este usuário não possui permissão para esta ação             |
  | 630          |    400     | Erro na validação. Veja error.message                        |
  | 711          |    404     | Cliente não encontrado                                       |
  | 741          |    404     | Resposta não encontrada                                      |
  """
  error: MyError
}
`

const readOwnResponseQuery = `
"Detalha resposta do cliente logado. APENAS PARA ('client')"
readOwnResponse(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!
): ReadOwnResponse!
`

export const types = ReadOwnResponseType

export const Query = readOwnResponseQuery
