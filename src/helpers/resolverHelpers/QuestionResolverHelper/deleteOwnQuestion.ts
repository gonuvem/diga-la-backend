import { UserDocument } from '../../../interfaces'
import {
  fetchOneQuestionWithFormAndType,
  checkQuestionInUse,
  deleteOneQuestion
} from '../../../services/models/QuestionService'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'

export async function deleteOwnQuestion (user: UserDocument,
  { id }:{ id: string }): Promise<{}> {
  await fetchOneClientWithUser({ conditions: { user: user._id } })

  const question = await fetchOneQuestionWithFormAndType({
    conditions: { _id: id }
  })

  await checkQuestionInUse({ id: question._id })

  await deleteOneQuestion({ conditions: { _id: question._id } })

  return {}
}
