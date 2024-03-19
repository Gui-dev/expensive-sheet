import { type User } from '@prisma/client'
import { AppError } from '../../../shared/error/app-error'
import { createUserRepository } from '../../users/repositories/create-user'
import { updateTransactionUseCase } from '../use-cases/update-transaction-use-case'
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

  it('should not be able update transaction without a user_id', async () => {
    const user_id = 'fake_user_id'

    await expect(
      updateTransactionUseCase({
        id: 'fake_id',
        user_id,
        description: 'fake_description',
        value: 10,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
