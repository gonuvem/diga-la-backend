import { Document } from 'mongoose'

import { QuestionDocument } from './Question'
import { FormDocument } from './Form'

export interface AnswerAndQuestion {
  question: QuestionDocument,
  answer: any
}

export interface ResponseInterface {
  form: FormDocument,
  answersAndQuestions: AnswerAndQuestion[]
}

export interface ResponseDocument extends ResponseInterface, Document {}
