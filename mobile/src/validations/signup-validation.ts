import { z } from 'zod'

export const signupValidation = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório',
    })
    .min(1, {
      message: 'O nome é obrigatório',
    }),
  email: z
    .string({
      required_error: 'O e-mail é obrigatório',
    })
    .min(1, {
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Digite um e-mail válido',
    }),
  password: z
    .string({
      required_error: 'A senha é obrigatório',
    })
    .min(6, {
      message: 'Sua senha deve ter no mínimo 6 caracteres',
    }),
})

export type SignupValidationData = z.infer<typeof signupValidation>
