import { ReactNode, createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'base-64'

import { SigninValidationData } from './../validations/signin-validation'
import { api } from './../services/api'

interface IUser {
  id: string
  name: string
  email: string
  created_at: string
}

interface IAuthContextProps {
  user: IUser | null
  loading: boolean
  isUserLoading: boolean
  login: (data: SigninValidationData) => Promise<void>
  logout: () => void
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextProps)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [isUserLoading, setIsUserLoading] = useState(false)

  useEffect(() => {
    setIsUserLoading(true)
    AsyncStorage.multiGet(['@xs:user', '@xs:token']).then((storage) => {
      const [check_user, check_token] = storage
      if (check_user[1] && check_token[1]) {
        setUser(JSON.parse(check_user[1]))
      }
      setIsUserLoading(false)
    })
    setIsUserLoading(false)
  }, [])

  const login = async ({
    email,
    password,
  }: SigninValidationData): Promise<void> => {
    try {
      setLoading(true)
      const response = await api.get('/login', {
        headers: {
          Authorization: 'Basic ' + base64.encode(email + ':' + password),
        },
      })
      await AsyncStorage.setItem('@xs:user', JSON.stringify(response.data.user))
      await AsyncStorage.setItem('@xs:token', response.data.token)
      setUser(response.data.user)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('@xs:user')
    await AsyncStorage.removeItem('@xs:token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, isUserLoading, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
