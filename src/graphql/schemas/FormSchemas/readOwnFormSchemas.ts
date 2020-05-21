const ReadOwnFormType = `
"Resposta da query que detalha pesquisa do cliente logado"
type ReadOwnForm {
  "Pesquisa consultada"
  form: Form
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
  | 721          |    404     | Pesquisa não encontrada                                     |
  """
  error: MyError
}
`

const readOwnFormQuery = `
"Detalha pesquisa do cliente logado. APENAS PARA ('client')"
readOwnForm(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!
): ReadOwnForm!
`

export const types = ReadOwnFormType

export const Query = readOwnFormQuery
