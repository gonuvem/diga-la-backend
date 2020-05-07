import {
  fakeFullName,
  fakeCpf,
  fakePassword,
  fakeEmail,
  fakeArray,
  fakeRole,
  fakeWord
} from '../fakers'

export const User = {
  name: fakeFullName,
  cpf: fakeCpf,
  password: fakePassword,
  email: fakeEmail,
  roles: fakeArray(fakeRole, 1),
  renewPasswordCode: fakeWord
}
