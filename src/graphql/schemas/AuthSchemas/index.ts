import * as loginSchemas from './loginSchemas'
import * as validateTokenSchemas from './validateTokenSchemas'
import * as forgotPasswordSchemas from './forgotPasswordSchemas'
import * as renewPasswordSchemas from './renewPasswordSchemas'
import * as readOwnProfileSchemas from './readOwnProfileSchemas'

export const types = `
${loginSchemas.types}
${validateTokenSchemas.types}
${forgotPasswordSchemas.types}
${renewPasswordSchemas.types}
${readOwnProfileSchemas.types}
`

export const Mutation = `
${loginSchemas.Mutation}
${validateTokenSchemas.Mutation}
${forgotPasswordSchemas.Mutation}
${renewPasswordSchemas.Mutation}
`

export const Query = `
${readOwnProfileSchemas.Query}
`
