import { fakeId, fakeWord, fakeArray } from '../fakers'
import { AnswerAndQuestion, ResponseInterface } from '../../interfaces'
import { Fake } from '../../types'

const fakeAnswerAndQuestion: AnswerAndQuestion = {
  question: fakeId(),
  answer: fakeWord()
}

export const Response: Fake<ResponseInterface> = {
  form: fakeId,
  answersAndQuestions: () => fakeArray(() => fakeAnswerAndQuestion, 3)
}
