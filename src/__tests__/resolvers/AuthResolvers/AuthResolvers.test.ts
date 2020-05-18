import loginTest from './loginTest'
import validateTokenTest from './validateTokenTest'
import forgotPasswordTest from './forgotPasswordTest'
import renewPasswordTest from './renewPasswordTest'
import readOwnProfileTest from './readOwnProfileTest'
import updateOwnProfileTest from './updateOwnProfileTest'
import updateOwnPasswordTest from './updateOwnPasswordTest'

describe('Test Auth Resolvers', () => {
  describe('Test login', loginTest)

  describe('Test validateToken', validateTokenTest)

  describe('Test forgotPassword', forgotPasswordTest)

  describe('Test renewPassword', renewPasswordTest)

  describe('Test readOwnProfile', readOwnProfileTest)

  describe('Test updateOwnProfile', updateOwnProfileTest)

  describe('Test updateOwnPassword', updateOwnPasswordTest)
})
