import Question from 'src/models/Question'
import Response from 'src/models/Response'
import {
  createOne,
  fetchOneWithPopulate,
  updateOne,
  deleteOne,
  checkInUse,
  listPaginatedWithPopulate
} from 'src/utils/mongoose'
import {
  QUESTIONS_EMPTY_LIST,
  QUESTION_NOT_FOUND,
  QUESTION_IN_USE
} from 'src/middlewares/errorHandling/errors'

const populate = [
  {
    path: 'form',
    populate: { path: 'client', populate: { path: 'user' } }
  },
  { path: 'type' }
]

export const createOneQuestion = createOne(Question)

export const fetchOneQuestionWithFormAndType = fetchOneWithPopulate(
  Question, QUESTION_NOT_FOUND, populate)

export const updateOneQuestion = updateOne(Question, QUESTION_NOT_FOUND)

export const deleteOneQuestion = deleteOne(Question, QUESTION_NOT_FOUND)

export const checkQuestionInUse = checkInUse(
  [
    { Model: Response, fieldName: 'answersAndQuestions.question' }
  ], QUESTION_IN_USE
)

export const listQuestionsWithFormAndTypePaginated =
listPaginatedWithPopulate(Question, QUESTIONS_EMPTY_LIST, populate)
