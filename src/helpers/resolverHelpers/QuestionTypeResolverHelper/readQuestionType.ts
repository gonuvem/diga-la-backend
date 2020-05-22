import { QuestionTypeDocument } from '../../../interfaces'
import {
  fetchOneQuestionType
} from '../../../services/models/QuestionTypeService'

export async function readQuestionType ({ id }: { id: string })
: Promise<{ type: QuestionTypeDocument }> {
  const type = await fetchOneQuestionType({ conditions: { _id: id } })

  return { type }
}
