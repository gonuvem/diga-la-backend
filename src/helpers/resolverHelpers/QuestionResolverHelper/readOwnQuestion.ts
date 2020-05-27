import { UserDocument, QuestionDocument } from '../../../interfaces'
import {
  fetchOneQuestionWithFormAndType
} from '../../../services/models/QuestionService'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'

export async function readOwnQuestion (user: UserDocument, { id }: { id: string }):
Promise<{ question: QuestionDocument }> {
  await fetchOneClientWithUser({ conditions: { user: user._id } })

  const question = await fetchOneQuestionWithFormAndType({
    conditions: { _id: id }
  })

  return { question }
}
