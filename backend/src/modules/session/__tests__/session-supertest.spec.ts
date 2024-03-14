import { type User } from '@prisma/client'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'

import { app } from './../../../server'
import { createUserRepository } from '../../users/repositories/create-user'
import { deleteUserRepository } from '../../users/repositories/delete-user'

let user: User

describe('Session /login', () => {
  beforeAll(async () => {
    const random = Math.floor(Math.random() * 1000) + 1
    user = await createUserRepository({
      name: `test-${random}`,
      email: `test-${random}@email.com`,
      password: '123456',
    })
  })

  afterAll(async () => {
    await deleteUserRepository({ id: user.id })
  })

  it('should not be able login for the user to log in with the wrong email address', async () => {
    const email = 'fake_email@email.com'
    const password = '123456'

    const result = await supertest(app.listen())
      .get('/login')
      .auth(email, password)

    expect(result.statusCode).toBe(401)
  })

  it('should not be able login for the user to log in with the wrong password', async () => {
    const email = 'bruce@email.com'
    const password = 'fake_password'

    const result = await supertest(app.listen())
      .get('/login')
      .auth(email, password)

    expect(result.statusCode).toBe(401)
  })

  it('should be able login for the user to log in with correct credentials', async () => {
    const result = await supertest(app.listen())
      .get('/login')
      .auth(user.email, '123456')
    const decoded = jwt.verify(result.body.token, process.env.SECRET_WORD)

    expect(result.statusCode).toBe(200)
    expect(result.body).toBeTruthy()
    expect(result.body.user.id).toBeTruthy()
    expect(result.body.token).toBeTruthy()
    expect(decoded.sub).toBe(result.body.user.id)
  })
})
