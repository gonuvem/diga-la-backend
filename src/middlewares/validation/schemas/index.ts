import AuthResolversSchemas from './resolversSchemas/AuthResolversSchemas'
import ClientResolversSchemas from './resolversSchemas/ClientResolversSchemas'
import FormResolversSchemas from './resolversSchemas/FormResolversSchemas'

export default {
  ...AuthResolversSchemas,
  ...ClientResolversSchemas,
  ...FormResolversSchemas
}
