import supertest from 'supertest'

import { app } from './../../../server'

describe('Session /login', () => {
  it('should not be able login for the user to log in with the wrong email address', async () => {
    const email = 'fake_email@email.com'
    const password = '123456'

    const result = await supertest(app.callback())
      .get('/login')
      .auth(email, password)

    expect(result.statusCode).toBe(401)
  })
})
