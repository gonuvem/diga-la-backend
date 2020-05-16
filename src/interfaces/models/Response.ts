import { Document, Types } from 'mongoose'

import { QuestionDocument } from './Question'
import { FormDocument } from './Form'

export interface AnswerAndQuestion {
  question: QuestionDocument | Types.ObjectId,
  answer: any
}

export interface ResponseInterface {
  form: Partial<FormDocument> | Types.ObjectId,
  answersAndQuestions: AnswerAndQuestion[]
}

export interface ResponseDocument extends ResponseInterface, Document {}
