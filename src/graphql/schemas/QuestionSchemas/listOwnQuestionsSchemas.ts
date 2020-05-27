const ListOwnQuestionsType = `
"Resposta da query que lista questões do cliente logado."
type ListOwnQuestions {
  "Lista de questões"
  questions: [Question]
  "Total de documentos encontrados"
  total: Int
  "Quantidade de páginas"
  pages: Int
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
  | 750          |    404     | Nenhuma questão encontrada                                  |
  """
  error: MyError
}
`

const listOwnQuestionsQuery = `
"Lista questões do cliente logado de forma paginada. APENAS PARA ('client')"
listOwnQuestions(
  "Mínimo 0, Default: 0"
  page: Int
  "Mínimo 1, Default: 5"
  perPage: Int
  "Válidos: ['position'] Default: position"
  sort: String
  "Filtro por pesquisa"
  form: ID!
  "Filtro por página da pesquisa"
  formPage: Int
): ListOwnQuestions!
`

export const types = ListOwnQuestionsType

export const Query = listOwnQuestionsQuery
