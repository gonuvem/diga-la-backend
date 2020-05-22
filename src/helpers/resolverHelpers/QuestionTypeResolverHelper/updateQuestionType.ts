import { QuestionTypeDocument } from '../../../interfaces'
import { UpdateQuestionTypeInput } from '../../../types'
import {
  updateOneQuestionType,
  checkQuestionTypeConflicts,
  fetchOneQuestionType
} from '../../../services/models/QuestionTypeService'

export async function updateQuestionType (
  { id, input }: { id: string, input: UpdateQuestionTypeInput })
: Promise<{ type: QuestionTypeDocument }> {
  const type = await fetchOneQuestionType({ conditions: { _id: id } })

  if (input.alias) await checkQuestionTypeConflicts(input, type._id)

  const typeUpdated = await updateOneQuestionType({
    conditions: { _id: type._id },
    updateData: input
  })

  return { type: typeUpdated }
}
