import * as createClientSchemas from './createClientSchemas'
import * as updateClientSchemas from './updateClientSchemas'
import * as deleteClientSchemas from './deleteClientSchemas'
import * as listClientsSchemas from './listClientsSchemas'
import * as readClientSchemas from './readClientSchemas'

export const types = `
${createClientSchemas.types}
${updateClientSchemas.types}
${deleteClientSchemas.types}
${listClientsSchemas.types}
${readClientSchemas.types}
`

export const inputs = `
${createClientSchemas.inputs}
${updateClientSchemas.inputs}
`

export const Query = `
${listClientsSchemas.Query}
${readClientSchemas.Query}
`

export const Mutation = `
${createClientSchemas.Mutation}
${updateClientSchemas.Mutation}
${deleteClientSchemas.Mutation}
`
