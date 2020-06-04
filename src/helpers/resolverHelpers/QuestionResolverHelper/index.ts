import { Query } from 'mongoose'

import {
  FormDocument,
  QuestionDocument,
  QuestionTypeDocument
} from '../../../interfaces'
import { fetchOneFormWithoutError } from '../../../services/models/FormService'
import {
  fetchOneQuestionTypeWithoutError
} from '../../../services/models/QuestionTypeService'

export * from './createOwnQuestion'
export * from './updateOwnQuestion'
export * from './deleteOwnQuestion'
export * from './listOwnQuestions'
export * from './readOwnQuestion'

export function getQuestionForm (question: QuestionDocument)
: Query<FormDocument> {
  return fetchOneFormWithoutError({ conditions: { _id: question.form } })
}

export function getQuestionType (question: QuestionDocument)
: Query<QuestionTypeDocument> {
  return fetchOneQuestionTypeWithoutError({
    conditions: { _id: question.type }
  })
}
