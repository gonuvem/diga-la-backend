import * as createClientSchemas from './createClientSchemas'
import * as updateClientSchemas from './updateClientSchemas'

export const types = `
${createClientSchemas.types}
${updateClientSchemas.types}
`

export const inputs = `
${createClientSchemas.inputs}
${updateClientSchemas.inputs}
`

export const Mutation = `
${createClientSchemas.Mutation}
${updateClientSchemas.Mutation}
`
