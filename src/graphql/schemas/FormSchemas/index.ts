import * as createOwnFormSchemas from './createOwnFormSchemas'
import * as updateOwnFormSchemas from './updateOwnFormSchemas'
import * as deleteOwnFormSchemas from './deleteOwnFormSchemas'

export const types = `
${createOwnFormSchemas.types}
${updateOwnFormSchemas.types}
${deleteOwnFormSchemas.types}
`

export const inputs = `
${createOwnFormSchemas.inputs}
${updateOwnFormSchemas.inputs}
`

export const Mutation = `
${createOwnFormSchemas.Mutation}
${updateOwnFormSchemas.Mutation}
${deleteOwnFormSchemas.Mutation}
`