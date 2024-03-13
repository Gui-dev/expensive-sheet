// import { type Transaction } from '@prisma/client'
import { type User } from '@prisma/client'

import { createTransactionService } from '../use-cases/create-transaction-service'
import { AppError } from '../../../shared/error/app-error'
import { createUserRepository } from '../../users/repositories/create-user'
import { deleteUserRepository } from '../../users/repositories/delete-user'

let user: User

describe('Transactions', () => {
  beforeAll(async () => {
    user = await createUserRepository({
      name: 'test',
      email: 'test@email.com',
      password: 'fake_password',
    })
  })

  afterAll(async () => {
    await deleteUserRepository({ id: user.id })
  })

  it('should not be able to create a transaction without auth', async () => {
    const user_id = 'fake_user_id'
    const description = 'fake_description'
    const value = 10

    await expect(
      createTransactionService({
        user_id,
        description,
        value,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it.todo('should be able to create a new transaction to logged in user')
  it.todo('should not be able to create a new transaction without value')
})
