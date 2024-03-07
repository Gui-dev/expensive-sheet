import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'

import {
  signinValidation,
  SigninValidationData,
} from './../validations/signin-validation'
import { useAuth } from '../hooks/useAuth'

export const FormSignin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<SigninValidationData>({
    resolver: zodResolver(signinValidation),
  })
  const { login, loading } = useAuth()

  const handleSigninSubmit = async ({
    email,
    password,
  }: SigninValidationData) => {
    try {
      await login({ email, password })
      reset()
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 401) {
        setError('email', {
          message: 'E-mail ou senha inválidos',
        })
        setError('password', {
          message: 'E-mail ou senha inválidos',
        })
      }
    }
  }

  return (
    <View className="flex w-[80%] flex-col gap-4">
      <View className="flex flex-col gap-2">
        <Text className="text-lg text-gray-300">E-mail</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Digite aqui seu e-mail"
              placeholderTextColor="#FFF"
              className="h-14 rounded-md border border-gray-300 p-2 text-gray-300"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              autoCorrect={false}
              inputMode="email"
            />
          )}
        />
        {errors.email && (
          <Text className="text-sm text-red-300">{errors.email.message}</Text>
        )}
      </View>

      <View className="flex flex-col gap-2">
        <Text className="text-lg text-gray-300">Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Digite aqui sua senha"
              placeholderTextColor="#FFF"
              className="h-14 rounded-md border border-gray-300 p-2 text-gray-300"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text className="text-sm text-red-300">
            {errors.password.message}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className="flex h-14 items-center justify-center rounded-md bg-xs-green"
        activeOpacity={0.9}
        onPress={handleSubmit(handleSigninSubmit)}
      >
        {loading && <ActivityIndicator size="large" color="#FFF" />}
        {!loading && (
          <Text className="text-lg font-bold uppercase text-white">Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}
