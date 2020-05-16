const ClientType = `
"Cliente"
type Client {
  "Id"
  _id: ID!
  "Usuário associado ao cliente"
  user: BasicUser!
  "Data de criação"
  createdAt: Date!
  "Data de atualização"
  updatedAt: Date!
}
`

const ReadOwnProfileType = `
"Resposta do detalhe do perfil do cliente"
type ReadOwnProfile {
  client: Client
  error: MyError
}
`

const readOwnProfileQuery = `
"Detalhar perfil do cliente logado. APENAS PARA ('client')"
readOwnProfile: ReadOwnProfile!
`

export const types = `
${ClientType}
${ReadOwnProfileType}
`

export const Query = `
${readOwnProfileQuery}
`
