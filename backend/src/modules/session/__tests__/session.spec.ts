import { decodeBasicToken } from './../'
import { AppError } from '../../../shared/error/app-error'

describe('Session Module', () => {
  it('should return credentials by basic authentication token', async () => {
    const email = 'fake_email'
    const password = 'fake_password'
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')
    const basic_token = `Basic ${token}`
    const result = await decodeBasicToken(basic_token)
    expect(result).toEqual({
      email_credential: email,
      password_credential: password,
    })
  })

  it('should throw a exception when basic token is invalid', async () => {
    await expect(decodeBasicToken('')).rejects.toBeInstanceOf(AppError)
  })
})
