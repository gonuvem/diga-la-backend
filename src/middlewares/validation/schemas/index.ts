import AuthResolversSchemas from './resolversSchemas/AuthResolversSchemas'
import ClientResolversSchemas from './resolversSchemas/ClientResolversSchemas'
import FormResolversSchemas from './resolversSchemas/FormResolversSchemas'
import QuestionTypeResolversSchemas from './resolversSchemas/QuestionTypeResolversSchemas'
import QuestionResolversSchemas from './resolversSchemas/QuestionResolversSchemas'

export default {
  ...AuthResolversSchemas,
  ...ClientResolversSchemas,
  ...FormResolversSchemas,
  ...QuestionTypeResolversSchemas,
  ...QuestionResolversSchemas
}
