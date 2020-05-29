const ListOwnResponsesType = `
"Resposta da query que lista respostas do cliente logado."
type ListOwnResponses {
  "Lista de respostas"
  responses: [Response]
  "Total de documentos encontrados"
  total: Int
  "Quantidade de páginas"
  pages: Int
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
  | 740          |    404     | Nenhuma resposta encontrada                                  |
  """
  error: MyError
}
`

const listOwnResponsesQuery = `
"Lista respostas do cliente logado de forma paginada. APENAS PARA ('client')"
listOwnResponses(
  "Mínimo 0, Default: 0"
  page: Int
  "Mínimo 1, Default: 5"
  perPage: Int
  "Válidos: ['createdAt', '-createdAt'] Default: -createdAt"
  sort: String
  "Filtro por pesquisa"
  form: ID!
  "Filtro por questão"
  question: ID
): ListOwnResponses!
`

export const types = ListOwnResponsesType

export const Query = listOwnResponsesQuery
