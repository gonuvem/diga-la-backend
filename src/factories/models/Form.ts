import {
  fakeWord,
  fakeSentence,
  fakePhoto,
  fakeBoolean,
  fakeId,
  fakePastDate,
  fakeFutureDate,
  fakeRandomInt
} from '../fakers'
import { FormInterface, FormConfig, FormStyle } from '../../interfaces'
import { Fake } from '../../types'

const fakeFormConfig: FormConfig = {
  name: fakeWord(),
  description: fakeSentence(),
  beginDate: fakePastDate(),
  endDate: fakeFutureDate(),
  hasLimitedResponses: fakeBoolean(),
  maxResponses: fakeRandomInt({ min: 1, max: 500 })(),
  isTotemMode: fakeBoolean(),
  canDisplayProgressBar: fakeBoolean(),
  progressBarType: fakeWord(),
  canAllowMultipleSubmissions: fakeBoolean()
}

const fakeFormStyle: FormStyle = {
  background: fakeWord(),
  logo: fakePhoto(),
  headerText: fakeSentence(),
  hasLogoInHeader: fakeBoolean(),
  headerBackground: fakeWord(),
  footerText: fakeSentence(),
  footerBackground: fakeWord()
}

export const Form: Fake<FormInterface> = {
  client: fakeId,
  isActive: fakeBoolean,
  config: (): FormConfig => fakeFormConfig,
  style: (): FormStyle => fakeFormStyle
}
