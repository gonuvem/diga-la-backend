import * as loginSchemas from './loginSchemas'
import * as validateTokenSchemas from './validateTokenSchemas'
import * as forgotPasswordSchemas from './forgotPasswordSchemas'

export const types = `
${loginSchemas.types}
${validateTokenSchemas.types}
${forgotPasswordSchemas.types}
`

export const Mutation = `
${loginSchemas.Mutation}
${validateTokenSchemas.Mutation}
${forgotPasswordSchemas.Mutation}
`
