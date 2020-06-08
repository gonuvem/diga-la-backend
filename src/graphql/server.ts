import { ApolloServer, IResolvers } from 'apollo-server-express'

import typeDefs from './schemas'
import resolvers from './resolvers'
import { IS_NOT_PRODUCTION } from '../utils/constants'
import {
  getResponseAnswersAndQuestionsDataLoader
} from '../helpers/resolverHelpers/ResponseResolverHelper'

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers as IResolvers,
  context: ({ req, res }): object => ({
    req,
    res,
    loaders: {
      answersAndQuestionsLoader: getResponseAnswersAndQuestionsDataLoader()
    }
  }),
  playground: IS_NOT_PRODUCTION === true,
  introspection: IS_NOT_PRODUCTION === true
})

export default gqlServer
