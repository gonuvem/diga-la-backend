import { UserDocument, QuestionDocument } from '../../../interfaces'
import {
  fetchOneQuestion,
  checkQuestionInUse,
  deleteOneQuestion,
  fetchAllQuestions
} from '../../../services/models/QuestionService'
import { fetchOneClient } from '../../../services/models/ClientService'

const getNextQuestionsFromSameFormPage = async (id: string, formPage: number,
  outgoingPosition: number)
: Promise<QuestionDocument[]> => {
  return await fetchAllQuestions({
    conditions: {
      formPage,
      _id: { $ne: id },
      position: { $gt: outgoingPosition }
    },
    sort: 'position',
    lean: false
  })
}

const updateNextQuestionsPositions = async (position: number,
  nextQuestions: QuestionDocument[])
  : Promise<void> => {
  for (const [i, question] of nextQuestions.entries()) {
    question.position = position + i
    await question.save()
  }
}

const repositionQuestions = async (id: string, formPage: number,
  outgoingPosition: number)
: Promise<void> => {
  const nextQuestions = await getNextQuestionsFromSameFormPage(id, formPage,
    outgoingPosition)

  await updateNextQuestionsPositions(outgoingPosition, nextQuestions)
}

export async function deleteOwnQuestion (user: UserDocument,
  { id }:{ id: string }): Promise<{}> {
  await fetchOneClient({ conditions: { user: user._id } })

  const { _id, formPage, position } = await fetchOneQuestion({
    conditions: { _id: id }
  })

  await checkQuestionInUse({ id: _id })

  await repositionQuestions(_id, formPage, position)

  await deleteOneQuestion({ conditions: { _id: _id } })

  return {}
}
