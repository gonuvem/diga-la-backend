import { Types } from 'mongoose'

import { QuestionDocument } from '../../../interfaces'
import { SubmitResponseInput } from '../../../types'
import { createOneResponse } from '../../../services/models/ResponseService'
import { fetchOneForm } from '../../../services/models/FormService'
import { fetchAllQuestions } from '../../../services/models/QuestionService'
import { QUESTION_NOT_FOUND } from '../../../middlewares/errorHandling/errors'

const checkForQuestionNotFound = (ids: Types.ObjectId[],
  questions: QuestionDocument[]): void => {
  const getId = (question: QuestionDocument): string => question._id.toString()

  const isNotInQuestions = (id: Types.ObjectId): boolean =>
    !questions.map(getId).includes(id.toString())

  if (ids.some(isNotInQuestions)) throw QUESTION_NOT_FOUND
}

export async function submitResponse (input: SubmitResponseInput)
: Promise<{ }> {
  const form = await fetchOneForm({ conditions: { _id: input.form } })

  const questionsIds = input.answersAndQuestions.map(o => o.question)
  const questions = await fetchAllQuestions({
    conditions: { _id: { $in: questionsIds }, form: form._id }
  })
  checkForQuestionNotFound(questionsIds, questions)

  await createOneResponse({ doc: input })

  return { }
}
