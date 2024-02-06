'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Loader, LogIn } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  SigninValidationData,
  signinValidation,
} from '@/validations/signin-validation'
import { useAuth } from '@/hooks/useAuth'

export const FormSignin = () => {
  const navigation = useRouter()
  const { loading, login } = useAuth()

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<SigninValidationData>({
    resolver: zodResolver(signinValidation),
  })

  const handleSignin = async ({ email, password }: SigninValidationData) => {
    try {
      await login({ email, password })
      navigation.push('/')
    } catch (error) {
      const err = error as AxiosError
      console.log(err.response?.status)
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
    <form
      onSubmit={handleSubmit(handleSignin)}
      className="flex w-full max-w-[75%] flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          placeholder="Digite aqui o seu E-mail"
          id="email"
          className="border border-xs-green"
          {...register('email')}
        />
        {errors && errors.email && (
          <span className="text-xs text-xs-red">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          placeholder="Digite aqui a sua Senha"
          id="password"
          className="border border-xs-green"
          {...register('password')}
        />
        {errors && errors.password && (
          <span className="text-xs text-xs-red">{errors.password.message}</span>
        )}
      </div>

      <Button className="mt-8">
        {loading && <Loader className="h-4 w-4 animate-spin text-white" />}
        {!loading && (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Entrar
          </>
        )}
      </Button>
    </form>
  )
}
