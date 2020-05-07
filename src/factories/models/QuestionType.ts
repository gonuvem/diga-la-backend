import { QuestionTypeAlias, QuestionTypeKind } from 'src/enums'
import {
  fakeRandomArrayElement,
  fakeWord,
  fakePhoto,
  fakeSentence
} from '../fakers'

export const QuestionType = {
  kind: fakeRandomArrayElement(Object.values(QuestionTypeKind)),
  alias: fakeRandomArrayElement(Object.values(QuestionTypeAlias)),
  name: fakeWord,
  cover: fakePhoto,
  description: fakeSentence
}
