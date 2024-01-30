import Image from 'next/image'
import Link from 'next/link'

import { FormSignin } from '../components/form-signin'

const Login = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-16">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <h1 className="-mb-16 text-center text-4xl text-xs-green">XS</h1>
        <Image
          src="/logo.png"
          alt="Expensive Sheet Logo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>
      <div className="w-1/2">
        <h2 className="mb-8 text-center text-lg">Login</h2>
        <FormSignin />
        <Link
          href="/"
          className="mt-8 block text-center text-sm transition-all hover:underline"
        >
          Não tem cadastro? Faça o{' '}
          <span className="text-lg text-xs-blue">registro</span>
        </Link>
      </div>
    </div>
  )
}

export default Login
