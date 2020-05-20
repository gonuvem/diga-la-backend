const UpdateOwnFormInput = `
"Parâmetros para atualizar pesquisa. Pelo menos um dos campos opcionais deve ser enviado."
input UpdateOwnFormInput {
  "Valor booleano"
  isActive: Boolean
  config: FormConfigInput
  style: FormStyleInput
}
`

const UpdateOwnFormType = `
"Resposta da mutation que atualiza pesquisa"
type UpdateOwnForm {
  "Pesquisa atualizada"
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
  | 703          |    409     | Já existe um usuário com este email                         |
  | 711          |    404     | Cliente não encontrado                                      |
  | 721          |    404     | Pesquisa não encontrada                                     |
  """
  error: MyError
}
`

const updateOwnFormMutation = `
"Mutation que atualiza pesquisa. APENAS PARA ('dev')"
updateOwnForm(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!, 
  input: UpdateOwnFormInput!
): UpdateOwnForm!
`

export const types = UpdateOwnFormType

export const inputs = UpdateOwnFormInput

export const Mutation = updateOwnFormMutation
