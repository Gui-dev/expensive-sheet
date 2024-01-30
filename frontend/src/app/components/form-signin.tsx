'use client'

import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'

export const FormSignin = () => {
  const { handleSubmit } = useForm()

  const handleSignin = () => {
    console.log('AQIII')
  }

  return (
    <form onSubmit={handleSubmit(handleSignin)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          placeholder="Digite aqui o seu E-mail"
          id="email"
          className="border border-xs-green"
        />
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          placeholder="Digite aqui a sua Senha"
          id="password"
          className="border border-xs-green"
        />
      </div>

      <Button className="mt-8">
        <LogIn className="mr-2 h-4 w-4" />
        Entrar
      </Button>
    </form>
  )
}
