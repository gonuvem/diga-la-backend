const BasicUserType = `
"Informações básicas do usuário"
type BasicUser {
  "Id do usuário"
  _id: ID!
  "Nome"
  name: String!
  "Email"
  email: String!
  "Papéis"
  roles: [Role!]!
}
`

const UserRoleInfoType = `
"Informações do usuário"
type UserRoleInfo {
  "Id do papel do usuário (client._id, etc...). É null quando for DEV."
  _id: ID
  "Informações básicas do usuário"
  user: BasicUser!
}
`

const LoginType = `
"Resposta da mutation login"
type Login {
  "Token criado para o usuário"
  token: String
  "Informações do usuário"
  info: UserRoleInfo
  """
  | internalCode | statusCode | message/Descrição                                           |
  | :----------- | :--------: | ----------------------------------------------------------- |
  | 600          |    500     | Erro inesperado. Veja error.internalError e avisar ao back. |
  | 630          |    400     | Erro na validação. Veja error.message                       |
  | 700          |    404     | Usuário não encontrado                                      |
  | 709          |    403     | Senha incorreta                                             |
  """
  error: MyError
}
`

const loginMutation = `
"Realiza o login do usuário"
login(
  "Formato de email válido"
  email: String!
  "Mínimo: 6 caracteres"
  password: String!
): Login!
`

export const types = `
${BasicUserType}
${UserRoleInfoType}
${LoginType}
`

export const Mutation = `
${loginMutation}
`
