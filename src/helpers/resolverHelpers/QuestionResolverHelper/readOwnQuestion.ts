import { UserDocument, QuestionDocument } from '../../../interfaces'
import { fetchOneQuestion } from '../../../services/models/QuestionService'
import { fetchOneClient } from '../../../services/models/ClientService'

export async function readOwnQuestion (user: UserDocument,
  { id }: { id: string }): Promise<{ question: QuestionDocument }> {
  await fetchOneClient({ conditions: { user: user._id } })

  const question = await fetchOneQuestion({ conditions: { _id: id } })

  return { question }
}
