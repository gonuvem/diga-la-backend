import { QuestionDocument, UserDocument } from '../../../interfaces'
import { UpdateOwnQuestionInput } from '../../../types'
import { fetchOneClient } from '../../../services/models/ClientService'
import {
  fetchOneQuestion,
  updateOneQuestion,
  fetchAllQuestions
} from '../../../services/models/QuestionService'

const getAnotherQuestionsFromSameFormPage = async (id: string, formPage: number)
: Promise<QuestionDocument[]> => {
  return await fetchAllQuestions({
    conditions: { formPage, _id: { $ne: id } },
    sort: 'position',
    lean: false
  })
}

const splitQuestionsByPosition = (position: number,
  questions: QuestionDocument[]): { previousQuestions: QuestionDocument[],
     nextQuestions: QuestionDocument[]} => {
  const [previousQuestions, nextQuestions] = [
    questions.slice(0, position),
    questions.slice(position)
  ]

  return { previousQuestions, nextQuestions }
}

const updatePreviousAndNextQuestionsPositions = async (position: number,
  previousQuestions: QuestionDocument[], nextQuestions: QuestionDocument[])
  : Promise<void> => {
  for (const [i, question] of previousQuestions.entries()) {
    question.position = i
    await question.save()
  }

  for (const [i, question] of nextQuestions.entries()) {
    question.position = position + i + 1
    await question.save()
  }
}

const repositionQuestions = async (id: string, formPage: number,
  incomingPosition: number)
: Promise<void> => {
  const questions = await getAnotherQuestionsFromSameFormPage(id, formPage)

  const {
    previousQuestions,
    nextQuestions
  } = splitQuestionsByPosition(incomingPosition, questions)

  await updatePreviousAndNextQuestionsPositions(incomingPosition,
    previousQuestions, nextQuestions)
}

export async function updateOwnQuestion (user: UserDocument, { id, input }:
   { id: string, input: UpdateOwnQuestionInput }):
    Promise<{ question: QuestionDocument }> {
  await fetchOneClient({ conditions: { user: user._id } })

  const { _id, position, formPage } = await fetchOneQuestion(
    { conditions: { _id: id } })

  const isModifyingPosition = input.position !== undefined &&
  input.position !== position

  if (isModifyingPosition) {
    await repositionQuestions(_id, formPage, input.position)
  }

  const questionUpdated = await updateOneQuestion(
    { conditions: { _id }, updateData: input })

  return { question: questionUpdated }
}
