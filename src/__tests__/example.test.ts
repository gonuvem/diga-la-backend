import request from 'supertest'

import app from '../app'

describe('Example Test', () => {
  /** Testar endpoint raiz */
  test('200 Server up', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({
          message: 'DIG API'
        })
      })
  })
})

describe('GQL Example Test', () => {
  /** Testar endpoint raiz */
  test('200 Server up', () => {
    return request(app)
      .post('/graphql')
      .send({ query: 'query { wakeUp }' })
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.data.wakeUp).toBe('DIG API')
      })
  })
})
