import QuestionType from '../../models/QuestionType';
import Question from '../../models/Question';
import {
  createOne,
  fetchOne,
  updateOne,
  deleteOne,
  checkInUse,
  listPaginated,
  checkConflicts,
  fetchOneWithoutError,
  checkIfExists,
} from '../../utils/mongoose';
import {
  QUESTION_TYPES_EMPTY_LIST,
  QUESTION_TYPE_NOT_FOUND,
  QUESTION_TYPE_IN_USE,
  ALIAS_CONFLICT,
} from '../../middlewares/errorHandling/errors';

export const createOneQuestionType = createOne(QuestionType);

export const fetchOneQuestionType = fetchOne(
  QuestionType,
  QUESTION_TYPE_NOT_FOUND
);

export const updateOneQuestionType = updateOne(
  QuestionType,
  QUESTION_TYPE_NOT_FOUND
);

export const deleteOneQuestionType = deleteOne(
  QuestionType,
  QUESTION_TYPE_NOT_FOUND
);

export const checkQuestionTypeInUse = checkInUse(
  [{ Model: Question, fieldName: 'type' }],
  QUESTION_TYPE_IN_USE
);

export const listQuestionTypesPaginated = listPaginated(
  QuestionType,
  QUESTION_TYPES_EMPTY_LIST
);

export const checkQuestionTypeConflicts = checkConflicts(QuestionType, [
  {
    fieldName: 'alias',
    error: ALIAS_CONFLICT,
  },
]);

export const fetchOneQuestionTypeWithoutError = fetchOneWithoutError(
  QuestionType
);

export const checkIfQuestionTypesExists = checkIfExists(
  QuestionType,
  QUESTION_TYPE_NOT_FOUND
);
