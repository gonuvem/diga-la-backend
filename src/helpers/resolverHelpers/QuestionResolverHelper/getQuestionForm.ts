import { Query } from 'mongoose'

import { FormDocument, QuestionDocument } from '../../../interfaces'
import { fetchOneFormWithoutError } from '../../../services/models/FormService'

export function getQuestionForm (question: QuestionDocument)
: Query<FormDocument> {
  return fetchOneFormWithoutError({ conditions: { _id: question.form } })
}
