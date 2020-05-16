import { Factory } from 'rosie'

import * as modelsFactories from './models'
import {
  UserInterface,
  ClientInterface,
  FormInterface,
  QuestionInterface,
  QuestionTypeInterface,
  ResponseInterface
} from '../interfaces'

Factory.define<ClientInterface>('Client').attrs(modelsFactories.Client)

Factory.define<FormInterface>('Form').attrs(modelsFactories.Form)

Factory.define<QuestionInterface>('Question').attrs(modelsFactories.Question)

Factory.define<QuestionTypeInterface>('QuestionType')
  .attrs(modelsFactories.QuestionType)

Factory.define<ResponseInterface>('Response').attrs(modelsFactories.Response)

Factory.define<UserInterface>('User').attrs(modelsFactories.User)

export default Factory
