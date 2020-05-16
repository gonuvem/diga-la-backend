import { fakeId } from '../fakers'
import { ClientInterface } from '../../interfaces'
import { Fake } from '../../types'

export const Client: Fake<ClientInterface> = {
  user: fakeId
}
