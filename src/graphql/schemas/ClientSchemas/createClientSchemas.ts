const CreateClientInput = `
"Parâmetros para cadastro de cliente"
input CreateClientInput {
  "Regex: /^[\w\W]+( [\w\W]+)+$/ -> Pelo menos duas palavras, Máximo: 80 caracteres"
  name: String!,
  "Formato de email válido"
  email: String!,
  "Mínimo: 6 caracteres"
  password: String!
}
`

const CreateClientType = `
"Resposta da mutation de criar um cliente"
type CreateClient {
  "Cliente criado"
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
  """
  error: MyError
}
`

const createClientMutation = `
"Cria um cliente gerando senha a partir do cpf. APENAS PARA ('dev')"
createClient(input: CreateClientInput!): CreateClient!
`

export const types = CreateClientType

export const inputs = CreateClientInput

export const Mutation = createClientMutation
