import { fakeId, fakeWord, fakeArray } from '../fakers'

export const AnswerAndQuestion = {
  question: fakeId(),
  answer: fakeWord()
}

export const Response = {
  form: fakeId,
  answersAndQuestions: fakeArray(() => AnswerAndQuestion, 3)
}
