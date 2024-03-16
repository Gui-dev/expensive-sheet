import { type User } from '@prisma/client'

import { createTransactionUseCase } from '../use-cases/create-transaction-use-case'
import { AppError } from '../../../shared/error/app-error'
import { createUserRepository } from '../../users/repositories/create-user'
import { sessionUseCase } from '../../session/use-cases/session-use-case'

let user: User

describe('Transactions', () => {
  beforeAll(async () => {
    const random = Math.floor(Math.random() * 1000) + 1
    user = await createUserRepository({
      name: `test-${random}`,
      email: `test-${random}@email.com`,
      password: '123456',
    })
  })

  it('should not be able to create a transaction without auth', async () => {
    const user_id = 'fake_user_id'
    const description = 'fake_description'
    const value = 10
    await expect(
      createTransactionUseCase({
        user_id,
        description,
        value,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should be able to create a new transaction to logged in user', async () => {
    const description = 'fake_description'
    const value = 10
    const response = await sessionUseCase({
      email: user.email,
      password: '123456',
    })
    const transaction = await createTransactionUseCase({
      user_id: response.user.id,
      description,
      value,
    })
    expect(transaction).toHaveProperty('id')
    expect(transaction.description).toEqual('fake_description')
    expect(transaction.user_id).toEqual(response.user.id)
  })
})
