import * as AuthResolvers from './AuthResolvers'

const resolvers = {
  Date: (value: string | number | Date): string => new Date(value).toISOString(),
  Query: {
    wakeUp: (): string => 'DIG API',
    ...AuthResolvers.Query
  },
  Mutation: {
    ...AuthResolvers.Mutation
  }
}

export default resolvers
