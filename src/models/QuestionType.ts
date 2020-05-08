import mongoose from 'mongoose'

import { QuestionTypeDocument } from '../interfaces'
import { QuestionTypeKind, QuestionTypeAlias } from '../enums'

const QuestionTypeSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: Object.values(QuestionTypeKind),
    required: true
  },
  alias: {
    type: String,
    enum: Object.values(QuestionTypeAlias),
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true })

const QuestionType = mongoose
  .model<QuestionTypeDocument>('QuestionType', QuestionTypeSchema)

export default QuestionType
