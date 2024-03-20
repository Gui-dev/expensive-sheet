import { AppError } from '../../../shared/error/app-error'
import { deleteTransactionUseCase } from '../use-cases/delete-transaction-use-case'

describe('Transaction Delete', () => {
  it('should not be able to delete a transaction without a user_id', async () => {
    const user_id = 'fake_user_id'
    await expect(
      deleteTransactionUseCase({
        id: 'fake_id',
        user_id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
