import { QuestionDocument, UserDocument } from '../../../interfaces'
import { CreateOwnQuestionInput } from '../../../types'
import { fetchOneClient } from '../../../services/models/ClientService'
import {
  createOneQuestion,
  countQuestionsTotal
} from '../../../services/models/QuestionService'
import { fetchOneForm } from '../../../services/models/FormService'
import { fetchOneQuestionType } from '../../../services/models/QuestionTypeService'

const getNextPosition = async (): Promise<number> => await countQuestionsTotal()

export async function createOwnQuestion (user: UserDocument,
  input: CreateOwnQuestionInput): Promise<{ question: QuestionDocument }> {
  const client = await fetchOneClient({ conditions: { user: user._id } })

  const [form, type] = await Promise.all([
    fetchOneForm({ conditions: { _id: input.form, client: client._id } }),
    fetchOneQuestionType({ conditions: { _id: input.type } })
  ])

  const position = await getNextPosition()

  const question = await createOneQuestion({
    doc: { ...input, form: form._id, type: type._id, position }
  })

  return { question }
}
