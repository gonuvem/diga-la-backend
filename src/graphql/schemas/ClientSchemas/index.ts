import * as createClientSchemas from './createClientSchemas'
import * as updateClientSchemas from './updateClientSchemas'
import * as deleteClientSchemas from './deleteClientSchemas'

export const types = `
${createClientSchemas.types}
${updateClientSchemas.types}
${deleteClientSchemas.types}
`

export const inputs = `
${createClientSchemas.inputs}
${updateClientSchemas.inputs}
`

export const Mutation = `
${createClientSchemas.Mutation}
${updateClientSchemas.Mutation}
${deleteClientSchemas.Mutation}
`
