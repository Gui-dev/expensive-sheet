import { useState } from 'react'
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import Toast from 'react-native-toast-message'

import {
  signupValidation,
  SignupValidationData,
} from './../validations/signup-validation'
import { createUserService } from '../services/create-user'

export const FormSignup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupValidationData>({
    resolver: zodResolver(signupValidation),
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignupSubmit = async ({
    name,
    email,
    password,
  }: SignupValidationData) => {
    try {
      setIsLoading(true)
      await createUserService({ name, email, password })
      Toast.show({
        type: 'success',
        text1: 'Cadastro realizado com sucesso',
        text2: 'Você será redirecionado para tela de login',
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.replace('/(public)')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      const err = error as AxiosError
      if (err.response?.status === 409) {
        setError('email', {
          message: 'Esse usuário já existe',
        })
      }
      setIsLoading(false)
    }
  }

  return (
    <View className="flex w-[80%] flex-col gap-4">
      <View className="flex flex-col gap-2">
        <Text className="text-lg text-gray-300">Nome</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Digite aqui seu nome"
              placeholderTextColor="#FFF"
              className="h-14 rounded-md border border-gray-300 p-2 text-gray-300"
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              autoCorrect={false}
              inputMode="text"
            />
          )}
        />
        {errors.name && (
          <Text className="text-sm text-red-300">{errors.name.message}</Text>
        )}
      </View>

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
        onPress={handleSubmit(handleSignupSubmit)}
      >
        {isLoading && <ActivityIndicator size="large" color="#FFF" />}
        {!isLoading && (
          <Text className="text-lg font-bold uppercase text-white">
            Cadastrar
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}
