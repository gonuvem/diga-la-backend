import { Query } from 'mongoose'

import {
  FormDocument,
  ResponseDocument,
  AnswerAndQuestion,
  QuestionDocument
} from '../../../interfaces'
import { fetchOneFormWithoutError } from '../../../services/models/FormService'
import {
  fetchOneQuestionWithoutError
} from '../../../services/models/QuestionService'

export * from './listOwnResponses'
export * from './readOwnResponse'
export * from './submitResponse'

export function getResponseForm (response: ResponseDocument):
 Query<FormDocument> {
  return fetchOneFormWithoutError({ conditions: { _id: response.form } })
}

export function getResponseQuestion (answerAndQuestion: AnswerAndQuestion):
 Query<QuestionDocument> {
  return fetchOneQuestionWithoutError({
    conditions: { _id: answerAndQuestion.question }
  })
}
