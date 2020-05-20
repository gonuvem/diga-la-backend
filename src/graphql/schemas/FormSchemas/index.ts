import * as createOwnFormSchemas from './createOwnFormSchemas'
import * as updateOwnFormSchemas from './updateOwnFormSchemas'

export const types = `
${createOwnFormSchemas.types}
${updateOwnFormSchemas.types}
`

export const inputs = `
${createOwnFormSchemas.inputs}
${updateOwnFormSchemas.inputs}
`

export const Mutation = `
${createOwnFormSchemas.Mutation}
${updateOwnFormSchemas.Mutation}
`
