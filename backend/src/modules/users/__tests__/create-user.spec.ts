import { createUserUseCase } from '../use-cases/create-user-use-case'
import { AppError } from '../../../shared/error/app-error'

describe('USER CREATE', () => {
  it('should not be able to create a new user with the same email', async () => {
    const { user } = await createUserUseCase({
      name: 'fake_name',
      email: 'fake_email@email.com',
      password: '123456',
    })

    await expect(
      createUserUseCase({
        name: 'another_fake_name',
        email: user.email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
