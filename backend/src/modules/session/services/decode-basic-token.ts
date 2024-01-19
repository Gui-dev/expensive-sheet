import { AppError } from '../../../shared/error/app-error'

interface IDecodeBasicTokenResponse {
  email_credential: string
  password_credential: string
}

export const decodeBasicToken = async (
  basic_token: string,
): Promise<IDecodeBasicTokenResponse> => {
  if (!basic_token) {
    throw new AppError('Hashed invalid')
  }

  const [, credentials] = basic_token.split(' ')
  const credential_result = Buffer.from(credentials, 'base64').toString('ascii')

  if (!credential_result.includes(':')) {
    throw new AppError('Credentials are in the wrong format')
  }

  const [email_credential, password_credential] = credential_result.split(':')
  return {
    email_credential,
    password_credential,
  }
}
