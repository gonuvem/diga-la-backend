const ListQuestionTypesType = `
"Resposta da query que lista Tipos de Questões."
type ListQuestionTypes {
  "Lista de Tipos de Questões"
  types: [QuestionType]
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
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 730          |    404     | Nenhum tipo de questão encontrado                           |
  """
  error: MyError
}
`

const listQuestionTypesQuery = `
"Lista tipos de questões de forma paginada."
listQuestionTypes(
  "Mínimo 0, Default: 0"
  page: Int
  "Mínimo 1, Default: 5"
  perPage: Int
  "Válidos: ['-name', 'name', '-createdAt', 'createdAt'] Default: name"
  sort: String
  "Filtro de Classificação"
  kind: QuestionTypeKind
  "Filtro de Apelido"
  alias: QuestionTypeAlias
): ListQuestionTypes!
`

export const types = ListQuestionTypesType

export const Query = listQuestionTypesQuery
