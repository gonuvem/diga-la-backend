import {
  fakeId,
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
  checkBox: fakeArray(fakeId, 3),
  date: fakeArray(fakeFutureDate, 1),
  dropDown: fakeArray(fakeId, 1),
  email: fakeEmail(),
  imageChoice: fakeArray(fakeId, 1),
  link: fakePhoto(),
  longText: fakeSentence(),
  matrix: fakeArray(fakeId, 3),
  nps: fakeRandomInt({ min: 0, max: 9 })(),
  number: fakeRandomInt({ min: 1, max: 100 })(),
  phone: fakePhone(),
  radioButton: fakeArray(fakeId, 1),
  shortText: fakeSentence(),
  slider: fakeRandomInt({ min: 1, max: 100 })(),
  sortList: fakeArray(fakeId, 5)
}

const fakeAnswerAndQuestion: AnswerAndQuestion = {
  question: fakeId(),
  answer: ((): AnswerAndQuestion['answer'] => fakeAnswer)()
}

export const Response: Fake<ResponseInterface> = {
  form: fakeId,
  answersAndQuestions: () => fakeArray(() => fakeAnswerAndQuestion, 3)
}
