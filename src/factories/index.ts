import { Factory } from 'rosie'

import * as modelsFactories from './models'

Factory.define('Client').attrs(modelsFactories.Client)

Factory.define('Form').attrs(modelsFactories.Form)

Factory.define('Question').attrs(modelsFactories.Question)

Factory.define('QuestionType').attrs(modelsFactories.QuestionType)

Factory.define('Response').attrs(modelsFactories.Response)

Factory.define('User').attrs(modelsFactories.User)

export default Factory
