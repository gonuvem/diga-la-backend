import { Schema } from '@hapi/joi'

import schemas from './schemas'

/**
 * Define qual schema de validação corresponde a uma dada operação graphql
 */
export const gqlRouter: { [resolverName: string]: Schema } = { ...schemas }
