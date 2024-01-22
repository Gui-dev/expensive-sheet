import supertest from 'supertest'
import bcrypt from 'bcrypt'

import { app } from './../../../server'
import { prisma } from '../../../services/prisma'

describe('Session /login', () => {
  beforeAll(async () => {
    const name = 'Bruce Wayne'
    const email = 'bruce@email.com'
    const password = '123456'

    const hashed_password = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed_password,
      },
    })
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
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
    const email = 'bruce@email.com'
    const password = '123456'

    const result = await supertest(app.listen())
      .get('/login')
      .auth(email, password)

    expect(result.statusCode).toBe(200)
    expect(result.body).toBeTruthy()
    expect(result.body.user.id).toBeTruthy()
    expect(result.body.token).toBeTruthy()
  })
})
