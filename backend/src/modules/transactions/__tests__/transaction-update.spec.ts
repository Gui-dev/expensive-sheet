import { type User } from '@prisma/client'
import { AppError } from '../../../shared/error/app-error'
import { createUserRepository } from '../../users/repositories/create-user'
import { updateTransactionUseCase } from '../use-cases/update-transaction-use-case'
import { sessionUseCase } from '../../session/use-cases/session-use-case'
import { createTransactionUseCase } from '../use-cases/create-transaction-use-case'

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

  it('should not be able update transaction without a transaction id', async () => {
    const response = await sessionUseCase({
      email: user.email,
      password: '123456',
    })

    await expect(
      updateTransactionUseCase({
        id: 'fake_id',
        user_id: response.user.id,
        description: 'fake_description',
        value: 10,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able update a transaction', async () => {
    const description = 'fake_description'
    const value = 10
    const response = await sessionUseCase({
      email: user.email,
      password: '123456',
    })

    const create_transaction = await createTransactionUseCase({
      user_id: response.user.id,
      description,
      value,
    })

    const update_transaction = await updateTransactionUseCase({
      id: create_transaction.id,
      user_id: response.user.id,
      description: 'fake_description_update',
      value: 11,
    })

    expect(update_transaction).toHaveProperty('id')
    expect(update_transaction.description).toEqual('fake_description_update')
    expect(update_transaction.value).toEqual(11)
    expect(update_transaction.user_id).toEqual(response.user.id)
    expect(update_transaction.id).toEqual(create_transaction.id)
  })
})
