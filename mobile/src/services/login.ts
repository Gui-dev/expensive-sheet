import base64 from 'base-64'
import { AxiosResponse } from 'axios'

import { SigninValidationData } from '../validations/signin-validation'
import { api } from './api'

export const loginService = async ({
  email,
  password,
}: SigninValidationData): Promise<AxiosResponse<any, any>> => {
  return await api.get('/login', {
    headers: {
      Authorization: 'Basic ' + base64.encode(email + ':' + password),
    },
  })
}
