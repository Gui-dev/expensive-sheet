import { type User } from '@prisma/client'

// import { createTransactionUseCase } from '../use-cases/create-transaction-use-case'
import { listTransactionUsecase } from '../use-cases/list-transaction-use-case'
import { AppError } from '../../../shared/error/app-error'
import { createUserRepository } from '../../users/repositories/create-user'
// import { sessionUseCase } from '../../session/use-cases/session-use-case'

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

  it('should not be able to list transaction without auth', async () => {
    const user_id = 'fake_user_id'

    await expect(listTransactionUsecase({ user_id })).rejects.toBeInstanceOf(
      AppError,
    )
  })
})
