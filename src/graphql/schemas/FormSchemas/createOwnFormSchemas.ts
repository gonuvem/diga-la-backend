const FormConfigType = `
"Configurações da pesquisa"
type FormConfig {
  "Nome da pesquisa"
  name: String!,
  "Texto introdutório"
  description: String,
  "Data de início da validade da pesquisa"
  beginDate: Date,
  "Data de fim da validade da pesquisa"
  endDate: Date,
  "Indica se há limite na quantidade de respostas"
  hasLimitedResponses: Boolean!,
  "Quantidade de respostas"
  maxResponses: Int,
  "Indica se é modo Totem"
  isTotemMode: Boolean!,
  "Indica se a barra de progresso deve ser mostrada"
  canDisplayProgressBar: Boolean!,
  "Tipo da barra de progresso"
  progressBarType: String,
  "Indica se múltiplas submissões são permitidas"
  canAllowMultipleSubmissions: Boolean!,
}
`

const FormStyleType = `
"Estilos da pesquisa"
type FormStyle {
  "Fundo da pesquisa"
  background: String,
  "Link da Logo"
  logo: String,
  "Texto do header"
  headerText: String,
  "Indica se há logo no header"
  hasLogoInHeader: Boolean!,
  "Fundo do header"
  headerBackground: String,
  "Texto do rodapé"
  footerText: String,
  "Fundo do rodapé"
  footerBackground: String,
}
`

const FormType = `
"Pesquisa"
type Form {
  "Id"
  _id: ID!
  "Cliente dono da pesquisa"
  client: Client!
  "Indica se a pesquisa está ativa"
  isActive: Boolean!
  "Configurações"
  config: FormConfig!
  "Estilos"
  style: FormStyle!
  "Data de criação"
  createdAt: Date!
  "Data de atualização"
  updatedAt: Date!
}
`

const FormConfigInput = `
"Parâmetros das configurações de uma pesquisa"
input FormConfigInput {
  "Mínimo: 1 caracter"
  name: String!,
  "Mínimo: 1 caracter"
  description: String,
  "Date em ISOString"
  beginDate: Date,
  "Date em ISOString"
  endDate: Date,
  "Valor booleano"
  hasLimitedResponses: Boolean,
  "Mínimo: 1"
  maxResponses: Int,
  "Valor booleano"
  isTotemMode: Boolean,
  "Valor booleano"
  canDisplayProgressBar: Boolean,
  "Mínimo: 1 caracter"
  progressBarType: String,
  "Valor booleano"
  canAllowMultipleSubmissions: Boolean,
}
`

const FormStyleInput = `
"Parâmetros dos estilos de uma pesquisa"
input FormStyleInput {
  "Mínimo: 1 caracter"
  background: String,
  "Formato de url válido"
  logo: String,
  "Mínimo: 1 caracter"
  headerText: String,
  "Valor booleano"
  hasLogoInHeader: Boolean,
  "Mínimo: 1 caracter"
  headerBackground: String,
  "Mínimo: 1 caracter"
  footerText: String,
  "Mínimo: 1 caracter"
  footerBackground: String,
}
`

const CreateOwnFormInput = `
"Parâmetros para criar uma pesquisa do cliente logado."
input CreateOwnFormInput {
  "Valor booleano. Default: false"
  isActive: Boolean
  config: FormConfigInput!
  style: FormStyleInput
}
`

const CreateOwnFormType = `
"Resposta da mutation que cria uma pesquisa do cliente logado"
type CreateOwnForm {
  "Pesquisa criada"
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
  """
  error: MyError
}
`

const createOwnFormMutation = `
"Cria uma pesquisa do cliente logado. APENAS PARA ('client')"
createOwnForm(input: CreateOwnFormInput!): CreateOwnForm!
`

export const types = `
${FormConfigType}
${FormStyleType}
${FormType}
${CreateOwnFormType}
`

export const inputs = `
${FormConfigInput}
${FormStyleInput}
${CreateOwnFormInput}
`

export const Mutation = createOwnFormMutation
