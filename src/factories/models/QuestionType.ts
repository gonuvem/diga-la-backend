import { QuestionTypeAlias, QuestionTypeKind } from '../../enums'
import {
  fakeRandomArrayElement,
  fakeWord,
  fakePhoto,
  fakeSentence
} from '../fakers'
import { QuestionTypeInterface } from '../../interfaces'
import { Fake } from '../../types'

export const QuestionType: Fake<QuestionTypeInterface> = {
  kind: fakeRandomArrayElement(Object.values(QuestionTypeKind)),
  alias: fakeRandomArrayElement(Object.values(QuestionTypeAlias)),
  name: fakeWord,
  cover: fakePhoto,
  description: fakeSentence
}
