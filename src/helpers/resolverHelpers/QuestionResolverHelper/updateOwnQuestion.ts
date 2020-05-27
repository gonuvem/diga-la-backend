import {
  QuestionDocument,
  UserDocument
} from '../../../interfaces'
import { UpdateOwnQuestionInput } from '../../../types'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'
import {
  fetchOneQuestionWithFormAndType,
  updateOneQuestion
} from '../../../services/models/QuestionService'

export async function updateOwnQuestion (user: UserDocument, { id, input }:
   { id: string, input: UpdateOwnQuestionInput }):
    Promise<{ question: QuestionDocument }> {
  await fetchOneClientWithUser({ conditions: { user: user._id } })

  const { _id, form, type } = await fetchOneQuestionWithFormAndType({
    conditions: { _id: id }
  })

  const questionUpdated = await updateOneQuestion({
    conditions: { _id },
    updateData: input
  })

  return { question: { ...questionUpdated, form, type } as QuestionDocument }
}
