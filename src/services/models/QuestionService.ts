import Question from '../../models/Question'
import Response from '../../models/Response'
import {
  createOne,
  fetchOne,
  updateOne,
  deleteOne,
  checkInUse,
  listPaginated,
  countTotal,
  fetchAll,
  fetchOneWithoutError
} from '../../utils/mongoose'
import {
  QUESTIONS_EMPTY_LIST,
  QUESTION_NOT_FOUND,
  QUESTION_IN_USE
} from '../../middlewares/errorHandling/errors'

export const createOneQuestion = createOne(Question)

export const fetchOneQuestion = fetchOne(Question, QUESTION_NOT_FOUND)

export const updateOneQuestion = updateOne(Question, QUESTION_NOT_FOUND)

export const deleteOneQuestion = deleteOne(Question, QUESTION_NOT_FOUND)

export const checkQuestionInUse = checkInUse(
  [
    { Model: Response, fieldName: 'answersAndQuestions.question' }
  ], QUESTION_IN_USE
)

export const listQuestionsPaginated = listPaginated(Question,
  QUESTIONS_EMPTY_LIST)

export const countQuestionsTotal = countTotal(Question)

export const fetchAllQuestions = fetchAll(Question)

export const fetchOneQuestionWithoutError = fetchOneWithoutError(Question)
