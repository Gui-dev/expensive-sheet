import { AppError } from '../../../shared/error/app-error'
import { findTransactionByIdUseCase } from '../use-cases/find-transaction-by-id-use-case'

describe('Transaction Update', () => {
  it('should not be able to find a transaction without a user_id', async () => {
    const user_id = 'fake_user_id'
    await expect(
      findTransactionByIdUseCase({
        id: 'fake_id',
        user_id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
