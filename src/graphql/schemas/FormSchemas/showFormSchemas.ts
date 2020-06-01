const ShowFormType = `
"Resposta da query que detalha pesquisa para público externo"
type ShowForm {
  "Pesquisa consultada"
  form: Form
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 721          |    404     | Pesquisa não encontrada                                     |
  """
  error: MyError
}
`

const showFormQuery = `
"Detalha pesquisa para público externo."
showForm(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!
): ShowForm!
`

export const types = ShowFormType

export const Query = showFormQuery
