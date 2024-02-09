import React from 'react'
import { render, screen } from '@testing-library/react'

import Signin from '../page'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

describe('Sign In Screen <Signin />', () => {
  it('should be able to reset the signin page with an email input, password input and a button', () => {
    render(<Signin />)
    const email_label = screen.getByLabelText('E-mail')
    const email_input = screen.getByPlaceholderText('Digite aqui o seu E-mail')
    const password_label = screen.getByLabelText('Senha')
    const password_input = screen.getByPlaceholderText(
      'Digite aqui a sua Senha',
    )
    const button = screen.getByRole('button', { name: 'entrar' })
    const link = screen.getByRole('link', { name: /cadastrar/i })

    expect(email_label).toBeInTheDocument()
    expect(email_input).toBeInTheDocument()
    expect(password_label).toBeInTheDocument()
    expect(password_input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/signup')
  })
})
