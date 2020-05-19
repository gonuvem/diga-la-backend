import * as AuthResolvers from './AuthResolvers'
import * as ClientResolvers from './ClientResolvers'

const resolvers = {
  Date: (value: string | number | Date): string => new Date(value).toISOString(),
  Query: {
    wakeUp: (): string => 'DIG API',
    ...AuthResolvers.Query,
    ...ClientResolvers.Query
  },
  Mutation: {
    ...AuthResolvers.Mutation,
    ...ClientResolvers.Mutation
  }
}

export default resolvers
