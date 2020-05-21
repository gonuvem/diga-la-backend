const ListOwnFormsType = `
"Resposta da query que lista pesquisas do cliente logado."
type ListOwnForms {
  "Lista de pesquisas"
  forms: [Form]
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
  | 720          |    404     | Nenhuma pesquisa encontrada                                 |
  """
  error: MyError
}
`

const listOwnFormsQuery = `
"Lista pesquisas do cliente logado de forma paginada. APENAS PARA ('client')"
listOwnForms(
  "Mínimo 0, Default: 0"
  page: Int
  "Mínimo 1, Default: 5"
  perPage: Int
  "Válidos: ['-config.name', 'config.name', '-createdAt', 'createdAt'] Default: -createdAt"
  sort: String
): ListOwnForms!
`

export const types = ListOwnFormsType

export const Query = listOwnFormsQuery
