'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'

import { SigninValidationData } from '@/validations/signin-validation'
import { api } from '@/services/api'

interface IUser {
  id: string
  name: string
  email: string
  created_at: string
}

interface IAuthContextProps {
  user: IUser | null
  loading: boolean
  login: (data: SigninValidationData) => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextProps)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const checkUser = getCookie('@xs:user')
    const checkToken = getCookie('@xs:token')
    if (checkUser && checkToken) {
      setUser(JSON.parse(checkUser))
    }
    setLoading(false)
  }, [])

  const login = async ({
    email,
    password,
  }: SigninValidationData): Promise<void> => {
    try {
      setLoading(true)
      const response = await api.get('/login', {
        auth: {
          username: email,
          password,
        },
      })
      setUser(response.data.user)
      setCookie('@xs:user', JSON.stringify(response.data.user))
      setCookie('@xs:token', response.data.token)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  )
}