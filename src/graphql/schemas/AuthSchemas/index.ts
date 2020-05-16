import * as loginSchemas from './loginSchemas'
import * as validateTokenSchemas from './validateTokenSchemas'

export const types = `
${loginSchemas.types}
${validateTokenSchemas.types}
`

export const Mutation = `
${loginSchemas.Mutation}
${validateTokenSchemas.Mutation}
`
