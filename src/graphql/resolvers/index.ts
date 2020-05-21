import * as AuthResolvers from './AuthResolvers'
import * as ClientResolvers from './ClientResolvers'
import * as FormResolvers from './FormResolvers'

const resolvers = {
  Date: (value: string | number | Date): string => new Date(value).toISOString(),
  Query: {
    wakeUp: (): string => 'DIG API',
    ...AuthResolvers.Query,
    ...ClientResolvers.Query,
    ...FormResolvers.Query
  },
  Mutation: {
    ...AuthResolvers.Mutation,
    ...ClientResolvers.Mutation,
    ...FormResolvers.Mutation
  }
}

export default resolvers
