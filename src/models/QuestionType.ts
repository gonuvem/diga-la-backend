import mongoose from 'mongoose'

import { QuestionTypeDocument, QuestionTypeInterface } from '../interfaces'
import { QuestionTypeKind, QuestionTypeAlias } from '../enums'
import { MongooseDefinition } from '../types'

const definition: MongooseDefinition<QuestionTypeInterface> = {
  kind: {
    type: String,
    enum: Object.values(QuestionTypeKind),
    required: true
  },
  alias: {
    type: String,
    enum: Object.values(QuestionTypeAlias),
    required: true,
    unique: true
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
}

const QuestionTypeSchema = new mongoose.Schema(definition, { timestamps: true })

const QuestionType = mongoose
  .model<QuestionTypeDocument>('QuestionType', QuestionTypeSchema)

export default QuestionType
