import * as createOwnFormSchemas from './createOwnFormSchemas'
import * as updateOwnFormSchemas from './updateOwnFormSchemas'
import * as deleteOwnFormSchemas from './deleteOwnFormSchemas'
import * as listOwnFormsSchemas from './listOwnFormsSchemas'
import * as readOwnFormSchemas from './readOwnFormSchemas'
import * as showFormSchemas from './showFormSchemas'

export const types = `
${createOwnFormSchemas.types}
${updateOwnFormSchemas.types}
${deleteOwnFormSchemas.types}
${listOwnFormsSchemas.types}
${readOwnFormSchemas.types}
${showFormSchemas.types}
`

export const inputs = `
${createOwnFormSchemas.inputs}
${updateOwnFormSchemas.inputs}
`

export const Query = `
${listOwnFormsSchemas.Query}
${readOwnFormSchemas.Query}
${showFormSchemas.Query}
`

export const Mutation = `
${createOwnFormSchemas.Mutation}
${updateOwnFormSchemas.Mutation}
${deleteOwnFormSchemas.Mutation}
`
