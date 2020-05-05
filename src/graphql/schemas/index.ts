import { gql } from 'apollo-server-express'

const basicTypes = `
"Tipo Date do JavaScript"
scalar Date
`

const Query = `
type Query {
  "Acorda a API"
  wakeUp: String
}
`

const typeDefs = gql`
${basicTypes}
${Query}
`

export default typeDefs
