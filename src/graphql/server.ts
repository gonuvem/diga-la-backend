import { ApolloServer, IResolvers } from 'apollo-server-express'

import typeDefs from './schemas'
import resolvers from './resolvers'
import { IS_NOT_PRODUCTION } from '../utils/constants'

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers as IResolvers,
  context: ({ req, res }): object => ({ req, res }),
  playground: IS_NOT_PRODUCTION,
  introspection: IS_NOT_PRODUCTION
})

export default gqlServer
