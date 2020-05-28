import {
  fakeId,
  fakeWord,
  fakeArray,
  fakeFutureDate,
  fakeEmail,
  fakePhoto,
  fakeSentence,
  fakeRandomInt,
  fakePhone
} from '../fakers'
import { AnswerAndQuestion, ResponseInterface } from '../../interfaces'
import { Fake } from '../../types'

const fakeAnswer: AnswerAndQuestion['answer'] = {
  checkBox: fakeArray(fakeWord, 3),
  date: fakeArray(fakeFutureDate, 1),
  dropDown: fakeArray(fakeWord, 1),
  email: fakeEmail(),
  imageChoice: fakeArray(fakeWord, 1),
  link: fakePhoto(),
  longText: fakeSentence(),
  matrix: fakeArray(fakeWord, 3),
  nps: fakeRandomInt({ min: 0, max: 9 })(),
  number: fakeRandomInt({ min: 1, max: 100 })(),
  phone: fakePhone(),
  radioButton: fakeArray(fakeWord, 1),
  shortText: fakeSentence(),
  slider: fakeRandomInt({ min: 1, max: 100 })(),
  sortList: fakeArray(fakeWord, 5)
}

const fakeAnswerAndQuestion: AnswerAndQuestion = {
  question: fakeId(),
  answer: ((): AnswerAndQuestion['answer'] => fakeAnswer)()
}

export const Response: Fake<ResponseInterface> = {
  form: fakeId,
  answersAndQuestions: () => fakeArray(() => fakeAnswerAndQuestion, 3)
}
