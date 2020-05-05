import request from 'supertest'

import app from '../app'

const testRestRoot = (): Promise<void> => {
  return request(app)
    .get('/')
    .then((response) => {
      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        message: 'DIG API'
      })
    })
}

const testGqlWakeUp = (): Promise<void> => {
  return request(app)
    .post('/graphql')
    .send({ query: 'query { wakeUp }' })
    .then((response) => {
      expect(response.status).toBe(200)
      expect(response.body.data.wakeUp).toBe('DIG API')
    })
}

/** Testes de exemplo */
describe('Example Tests', () => {
  test('200 Server up - REST', testRestRoot)

  test('200 Server up - GRAPHQL', testGqlWakeUp)
})
