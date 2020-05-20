import { gql } from 'apollo-server-express'

import * as AuthSchemas from './AuthSchemas'
import * as ClientSchemas from './ClientSchemas'
import * as FormSchemas from './FormSchemas'

const basicTypes = `
"Tipo Date do JavaScript"
scalar Date
"Erro original. Antes de ser modificado."
type InternalError {
  name: String!
  message: String!
  stack: String
}
"Erro customizado da API"
type MyError {
  "Mensagem de erro"
  message: String
  "Tipo do erro"
  error: String
  "Código do erro 400-599"
  statusCode: Int
  "Código interno do erro 600-999"
  internalCode: Int
  "Erro interno. Apenas para ambientes dev e staging."
  internalError: InternalError
}
"Tipos de papéis"
enum Role {
  "Desenvolvedor"
  dev,
  "Cliente"
  client
}
`

const types = `
${AuthSchemas.types}
${ClientSchemas.types}
${FormSchemas.types}
`

const enums = `
`

const inputs = `
${AuthSchemas.inputs}
${ClientSchemas.inputs}
${FormSchemas.inputs}
`

const Query = `
type Query {
  "Acorda a API"
  wakeUp: String
  ${AuthSchemas.Query}
  ${ClientSchemas.Query}
}
`

const Mutation = `
type Mutation {
  ${AuthSchemas.Mutation}
  ${ClientSchemas.Mutation}
  ${FormSchemas.Mutation}
}
`

const typeDefs = gql`
${basicTypes}
${types}
${enums}
${inputs}
${Query}
${Mutation}
`

export default typeDefs
