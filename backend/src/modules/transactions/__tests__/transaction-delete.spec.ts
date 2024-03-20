import { type User } from '@prisma/client'
import { AppError } from '../../../shared/error/app-error'
import { deleteTransactionUseCase } from '../use-cases/delete-transaction-use-case'
import { createUserRepository } from '../../users/repositories/create-user'
import { sessionUseCase } from '../../session/use-cases/session-use-case'

let user: User

describe('Transaction Delete', () => {
  beforeAll(async () => {
    const random = Math.floor(Math.random() * 1000) + 1
    user = await createUserRepository({
      name: `test-${random}`,
      email: `test-${random}@email.com`,
      password: '123456',
    })
  })

  it('should not be able to delete a transaction without a user_id', async () => {
    const user_id = 'fake_user_id'
    await expect(
      deleteTransactionUseCase({
        id: 'fake_id',
        user_id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a transaction without a transaction id', async () => {
    const response = await sessionUseCase({
      email: user.email,
      password: '123456',
    })

    await expect(
      deleteTransactionUseCase({
        id: 'fake_id',
        user_id: response.user.id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
