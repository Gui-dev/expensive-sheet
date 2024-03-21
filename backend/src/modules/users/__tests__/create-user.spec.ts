import { createUserUseCase } from '../use-cases/create-user-use-case'
import { AppError } from '../../../shared/error/app-error'
import { createUserRepository } from '../repositories/create-user-repository'
import { type User } from '@prisma/client'
import { deleteUserRepository } from '../repositories/delete-user-repository'

let user: User

describe('USER CREATE', () => {
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

  it('should not be able to create a new user with the same email', async () => {
    await expect(
      createUserUseCase({
        name: 'fake_name',
        email: user.email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a new user', async () => {
    const random = Math.floor(Math.random() * 1000) + 1

    const { user } = await createUserUseCase({
      name: 'fake_name',
      email: `test-${random}@email.com`,
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })
})
