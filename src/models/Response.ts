import mongoose from 'mongoose'

import { ResponseDocument } from '../interfaces'
import './Question'
import './Form'

const AnswerAndQuestionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answer: mongoose.Schema.Types.Mixed
}, { _id: false })

const ResponseSchema = new mongoose.Schema({
  form: {
    type: mongoose.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  answersAndQuestions: [{
    type: AnswerAndQuestionSchema,
    required: true
  }]
}, { timestamps: true })

const Response = mongoose.model<ResponseDocument>('Response', ResponseSchema)

export default Response
