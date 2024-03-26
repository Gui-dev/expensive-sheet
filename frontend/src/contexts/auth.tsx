'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

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
  logout: () => void
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
      api.defaults.headers.common.Authorization = `Bearer ${checkToken}`
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
      const { data } = await api.get('/login', {
        auth: {
          username: email,
          password,
        },
      })
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`
      setUser(data.user)
      setCookie('@xs:user', JSON.stringify(data.user))
      setCookie('@xs:token', data.token)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const logout = () => {
    deleteCookie('@xs:user')
    deleteCookie('@xs:token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
