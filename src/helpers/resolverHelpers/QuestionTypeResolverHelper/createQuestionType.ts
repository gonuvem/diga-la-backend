import { QuestionTypeDocument } from '../../../interfaces'
import { CreateQuestionTypeInput } from '../../../types'
import {
  createOneQuestionType,
  checkQuestionTypeConflicts
} from '../../../services/models/QuestionTypeService'

export async function createQuestionType (input: CreateQuestionTypeInput)
: Promise<{ type: QuestionTypeDocument }> {
  await checkQuestionTypeConflicts(input)

  const type = await createOneQuestionType({ doc: input })

  return { type }
}
