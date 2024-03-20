import { type User } from '@prisma/client'
import { AppError } from '../../../shared/error/app-error'
import { createUserRepository } from '../../users/repositories/create-user'
import { findTransactionByIdUseCase } from '../use-cases/find-transaction-by-id-use-case'
import { sessionUseCase } from '../../session/use-cases/session-use-case'

let user: User

describe('Transaction Update', () => {
  beforeAll(async () => {
    const random = Math.floor(Math.random() * 1000) + 1
    user = await createUserRepository({
      name: `test-${random}`,
      email: `test-${random}@email.com`,
      password: '123456',
    })
  })

  it('should not be able to find a transaction without a user_id', async () => {
    const user_id = 'fake_user_id'
    await expect(
      findTransactionByIdUseCase({
        id: 'fake_id',
        user_id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to find a transaction without a transaction id', async () => {
    const response = await sessionUseCase({
      email: user.email,
      password: '123456',
    })
    await expect(
      findTransactionByIdUseCase({
        user_id: response.user.id,
        id: 'fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
