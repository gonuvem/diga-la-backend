import mongoose from 'mongoose'

import {
  ResponseDocument,
  AnswerAndQuestion,
  ResponseInterface
} from '../interfaces'
import { MongooseDefinition } from '../types'
import './Question'
import './Form'

const answerAndQuestionDefinition: MongooseDefinition<AnswerAndQuestion> = {
  question: {
    type: mongoose.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answer: mongoose.Schema.Types.Mixed
}

const AnswerAndQuestionSchema = new mongoose.Schema(answerAndQuestionDefinition,
  { _id: false })

const responseDefinition: MongooseDefinition<ResponseInterface> = {
  form: {
    type: mongoose.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  answersAndQuestions: [{
    type: AnswerAndQuestionSchema,
    required: true
  }]
}

const ResponseSchema = new mongoose.Schema(responseDefinition,
  { timestamps: true })

const Response = mongoose.model<ResponseDocument>('Response', ResponseSchema)

export default Response
