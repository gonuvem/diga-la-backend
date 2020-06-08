import { Query } from 'mongoose'

import { QuestionDocument, QuestionTypeDocument } from '../../../interfaces'
import {
  fetchOneQuestionTypeWithoutError
} from '../../../services/models/QuestionTypeService'

export function getQuestionType (question: QuestionDocument)
: Query<QuestionTypeDocument> {
  return fetchOneQuestionTypeWithoutError({
    conditions: { _id: question.type }
  })
}
