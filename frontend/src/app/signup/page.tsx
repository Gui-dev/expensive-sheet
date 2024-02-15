import Image from 'next/image'
import Link from 'next/link'

import { FormSignup } from './../components/form-signup'
import { Logo } from '@/components/logo'

const Signup = () => {
  return (
    <div className="flex h-screen flex-1 items-center justify-center">
      <div className="relative flex h-screen flex-1 flex-col items-center justify-center bg-gray-900">
        <Logo className="absolute left-8 top-8" />
        <Image
          src="/logo.png"
          alt="Expensive Sheet Logo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[70%] object-contain"
        />
        <p className="max-w-[70%] text-center text-sm leading-6 text-gray-300">
          Chega de se perder nos gastos! Com o Expense Sheets, você assume o
          controle total das suas finanças de forma fácil e intuitiva.
        </p>
      </div>
      <div className="flex h-screen flex-1 flex-col items-center justify-center bg-gray-800">
        <h2 className="mb-8 text-lg">Cadastro</h2>
        <FormSignup />
        <Link
          href="/signin"
          className="mt-8 text-sm text-gray-500 transition-all hover:underline"
          aria-label="login"
        >
          Já tem cadastro? Faça{' '}
          <span className="text-lg text-xs-blue">login</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup
