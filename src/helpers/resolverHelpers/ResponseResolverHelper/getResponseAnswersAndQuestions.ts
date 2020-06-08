import Dataloader from 'dataloader'

import {
  ResponseDocument,
  AnswerAndQuestion,
  QuestionDocument
} from '../../../interfaces'
import { answersAndQuestionsDataLoader, ID } from '../../../types'
import { fetchAllQuestions } from '../../../services/models/QuestionService'
import { getProperty, isIDEqual } from '../../../utils/general'

function getQuestionsIdsFromResponses (responses: ResponseDocument[]): ID[] {
  return [].concat(...responses
    .map(response => response.answersAndQuestions
      .map(getProperty('question'))))
}

function populateQuestions (responses: ResponseDocument[],
  questions: QuestionDocument[]): AnswerAndQuestion[][] {
  const findQuestionById = (id: ID): QuestionDocument =>
    questions.find(question => isIDEqual(question._id, id))

  return responses.map(response => response.answersAndQuestions
    .map(answerAndQuestion => {
      const question = findQuestionById(answerAndQuestion.question as ID)

      return { ...answerAndQuestion, question }
    }))
}

async function getResponseAnswersAndQuestions (responses: ResponseDocument[])
: Promise<AnswerAndQuestion[][]> {
  const questionsIds = getQuestionsIdsFromResponses(responses)

  const questions = await fetchAllQuestions({
    conditions: { _id: { $in: questionsIds } }
  })

  return populateQuestions(responses, questions)
}

export function getResponseAnswersAndQuestionsDataLoader ()
: answersAndQuestionsDataLoader {
  return new Dataloader(getResponseAnswersAndQuestions)
}
