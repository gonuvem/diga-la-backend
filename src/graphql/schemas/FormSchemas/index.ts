import * as createOwnFormSchemas from './createOwnFormSchemas'
import * as updateOwnFormSchemas from './updateOwnFormSchemas'
import * as deleteOwnFormSchemas from './deleteOwnFormSchemas'
import * as listOwnFormsSchemas from './listOwnFormsSchemas'
import * as readOwnFormSchemas from './readOwnFormSchemas'

export const types = `
${createOwnFormSchemas.types}
${updateOwnFormSchemas.types}
${deleteOwnFormSchemas.types}
${listOwnFormsSchemas.types}
${readOwnFormSchemas.types}
`

export const inputs = `
${createOwnFormSchemas.inputs}
${updateOwnFormSchemas.inputs}
`

export const Query = `
${listOwnFormsSchemas.Query}
${readOwnFormSchemas.Query}
`

export const Mutation = `
${createOwnFormSchemas.Mutation}
${updateOwnFormSchemas.Mutation}
${deleteOwnFormSchemas.Mutation}
`
