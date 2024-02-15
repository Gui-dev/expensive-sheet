'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Loader, UserCheck } from 'lucide-react'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  SignupValidationData,
  signupValidation,
} from '@/validations/signup-validation'
import { api } from '@/services/api'

export const FormSignup = () => {
  const navigation = useRouter()
  const [loading, setLoading] = useState(false)
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<SignupValidationData>({
    resolver: zodResolver(signupValidation),
  })

  const handleRegister = async (data: SignupValidationData) => {
    try {
      setLoading(true)
      await api.post('/users', { ...data })
      setLoading(false)
      toast('Sucesso', {
        description: 'Usuário cadastrado',
      })
      navigation.push('/signin')
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 409) {
        setError('email', {
          message: 'E-mail já foi cadastrado, utilize outro endereço de email',
        })
      }
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex w-full max-w-[75%] flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          placeholder="Digite aqui o seu Nome"
          id="name"
          className="border border-xs-green"
          {...register('name')}
        />
        {errors && errors.name && (
          <span className="text-xs text-xs-red">{errors.name.message}</span>
        )}
      </div>
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

      <Button
        type="submit"
        className="mt-8"
        disabled={loading}
        aria-label="registrar"
      >
        {loading && <Loader className="h-4 w-4 animate-spin text-white" />}
        {!loading && (
          <>
            <UserCheck className="mr-2 h-4 w-4" />
            Registrar
          </>
        )}
      </Button>
    </form>
  )
}
