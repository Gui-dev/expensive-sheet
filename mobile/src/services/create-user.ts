import { AxiosResponse } from 'axios'

import { SignupValidationData } from '../validations/signup-validation'
import { api } from './api'

export const createUserService = async ({
  name,
  email,
  password,
}: SignupValidationData): Promise<AxiosResponse<any, any>> => {
  return await api.post('/users', { name, email, password })
}
