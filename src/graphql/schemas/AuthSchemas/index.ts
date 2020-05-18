import * as loginSchemas from './loginSchemas'
import * as validateTokenSchemas from './validateTokenSchemas'
import * as forgotPasswordSchemas from './forgotPasswordSchemas'
import * as renewPasswordSchemas from './renewPasswordSchemas'
import * as readOwnProfileSchemas from './readOwnProfileSchemas'
import * as updateOwnProfileSchemas from './updateOwnProfileSchemas'
import * as updateOwnPasswordSchemas from './updateOwnPasswordSchemas'

export const types = `
${loginSchemas.types}
${validateTokenSchemas.types}
${forgotPasswordSchemas.types}
${renewPasswordSchemas.types}
${readOwnProfileSchemas.types}
${updateOwnProfileSchemas.types}
${updateOwnPasswordSchemas.types}
`

export const inputs = `
${updateOwnProfileSchemas.inputs}
`

export const Mutation = `
${loginSchemas.Mutation}
${validateTokenSchemas.Mutation}
${forgotPasswordSchemas.Mutation}
${renewPasswordSchemas.Mutation}
${updateOwnProfileSchemas.Mutation}
${updateOwnPasswordSchemas.Mutation}
`

export const Query = `
${readOwnProfileSchemas.Query}
`
