const UpdateClientInput = `
"Parâmetros para atualizar um cliente. Pelo menos um dos campos opcionais deve ser enviado."
input UpdateClientInput {
  "Regex: /^[\w\W]+( [\w\W]+)+$/ -> Pelo menos duas palavras, Máximo: 80 caracteres"
  name: String,
  "Formato de email válido"
  email: String
}
`

const UpdateClientType = `
"Resposta da mutation que atualiza um cliente"
type UpdateClient {
  "Cliente atualizado"
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
  | 703          |    409     | Já existe um usuário com este email                         |
  | 711          |    404     | Cliente não encontrado                                      |
  """
  error: MyError
}
`

const updateClientMutation = `
"Mutation que atualiza um cliente. APENAS PARA ('dev')"
updateClient(
  "Regex: /^[0-9a-fA-F]{24}$/"
  id: ID!, 
  input: UpdateClientInput!
): UpdateClient!
`

export const types = UpdateClientType

export const inputs = UpdateClientInput

export const Mutation = updateClientMutation
