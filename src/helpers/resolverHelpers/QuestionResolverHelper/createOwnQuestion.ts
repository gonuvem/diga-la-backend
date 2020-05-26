import { QuestionDocument, UserDocument } from '../../../interfaces'
import { CreateOwnQuestionInput } from '../../../types'
import { fetchOneClientWithUser } from '../../../services/models/ClientService'
import { createOneQuestion } from '../../../services/models/QuestionService'
import { fetchOneFormWithClient } from '../../../services/models/FormService'
import { fetchOneQuestionType } from '../../../services/models/QuestionTypeService'

export async function createOwnQuestion (user: UserDocument,
  input: CreateOwnQuestionInput): Promise<{ question: QuestionDocument }> {
  const client = await fetchOneClientWithUser(
    { conditions: { user: user._id } })

  const [form, type] = await Promise.all([
    fetchOneFormWithClient({
      conditions: { _id: input.form, client: client._id }
    }),
    fetchOneQuestionType({ conditions: { _id: input.type } })
  ])

  const question = await createOneQuestion({
    doc: { ...input, form: form._id, type: type._id }
  })

  return { question: { ...question.toJSON(), form, type } }
}
