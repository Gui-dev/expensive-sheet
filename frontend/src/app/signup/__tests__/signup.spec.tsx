import React from 'react'
import { render, screen } from '@testing-library/react'

import Signup from '../page'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Sign Up Screen <Signup />', () => {
  it('should be able to show the signup page with a name input, email input, password input and a button', () => {
    render(<Signup />)
    const name_label = screen.getByLabelText('Nome')
    const name_input = screen.getByPlaceholderText('Digite aqui o seu Nome')
    const email_label = screen.getByLabelText('E-mail')
    const email_input = screen.getByPlaceholderText('Digite aqui o seu E-mail')
    const password_label = screen.getByLabelText('Senha')
    const password_input = screen.getByPlaceholderText(
      'Digite aqui a sua Senha',
    )
    const button = screen.getByRole('button', { name: 'registrar' })
    const link = screen.getByRole('link', { name: /login/i })

    expect(name_label).toBeInTheDocument()
    expect(name_input).toBeInTheDocument()
    expect(email_label).toBeInTheDocument()
    expect(email_input).toBeInTheDocument()
    expect(password_label).toBeInTheDocument()
    expect(password_input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/signin')
  })
})