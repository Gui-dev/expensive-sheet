import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  signupValidation,
  SignupValidationData,
} from './../validations/signup-validation'

export const FormSignup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValidationData>({
    resolver: zodResolver(signupValidation),
  })
  const handleSigninSubmit = ({
    name,
    email,
    password,
  }: SignupValidationData) => {
    console.log({ name, email, password })
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
              className="h-12 rounded-md border border-gray-300 p-2 text-gray-300"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              autoCorrect={false}
              inputMode="email"
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
              className="h-12 rounded-md border border-gray-300 p-2 text-gray-300"
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
              placeholder="Digite aqui seu senha"
              placeholderTextColor="#FFF"
              className="h-12 rounded-md border border-gray-300 p-2 text-gray-300"
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
        className="flex h-12 items-center justify-center rounded-md bg-xs-green"
        activeOpacity={0.9}
        onPress={handleSubmit(handleSigninSubmit)}
      >
        <Text className="text-lg font-bold text-white">Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}
