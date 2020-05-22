import {
  fetchOneQuestionType,
  checkQuestionTypeInUse,
  deleteOneQuestionType
} from '../../../services/models/QuestionTypeService'

export async function deleteQuestionType ({ id }: { id: string }): Promise<{}> {
  const type = await fetchOneQuestionType({ conditions: { _id: id } })

  await checkQuestionTypeInUse({ id: type._id })

  await deleteOneQuestionType({ conditions: { _id: type._id } })

  return { }
}
