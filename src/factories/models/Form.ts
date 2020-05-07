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

export const FormConfig = {
  name: fakeWord,
  description: fakeSentence,
  beginDate: fakePastDate,
  endDate: fakeFutureDate,
  hasLimitedResponses: fakeBoolean,
  maxResponses: fakeRandomInt({ min: 1, max: 500 }),
  isTotemMode: fakeBoolean,
  canDisplayProgressBar: fakeBoolean,
  progressBarType: fakeWord,
  canAllowMultipleSubmissions: fakeBoolean
}

export const FormStyle = {
  background: fakeWord,
  logo: fakePhoto,
  headerText: fakeSentence,
  hasLogoInHeader: fakeBoolean,
  headerBackground: fakeWord,
  footerText: fakeSentence,
  footerBackground: fakeWord
}

export const Form = {
  client: fakeId,
  isActive: fakeBoolean,
  config: (): object => FormConfig,
  style: (): object => FormStyle
}
