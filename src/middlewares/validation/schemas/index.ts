import AuthResolversSchemas from './resolversSchemas/AuthResolversSchemas'
import ClientResolversSchemas from './resolversSchemas/ClientResolversSchemas'
import FormResolversSchemas from './resolversSchemas/FormResolversSchemas'
import QuestionTypeResolversSchemas from './resolversSchemas/QuestionTypeResolversSchemas'

export default {
  ...AuthResolversSchemas,
  ...ClientResolversSchemas,
  ...FormResolversSchemas,
  ...QuestionTypeResolversSchemas
}
