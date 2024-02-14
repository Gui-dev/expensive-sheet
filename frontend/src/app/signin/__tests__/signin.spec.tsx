import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import Signin from '../page'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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

  it('should show error messages when password field is empty', async () => {
    render(<Signin />)
    const email_input = screen.getByPlaceholderText('Digite aqui o seu E-mail')

    const button = screen.getByRole('button', { name: 'entrar' })

    await waitFor(() => {
      fireEvent.change(email_input, { target: { value: 'bruce@email.com' } })
      fireEvent.click(button)
    })
    expect(
      await screen.findByText('Sua senha deve ter no mínimo 6 caracteres'),
    ).toBeInTheDocument()
  })

  it('should show error messages when email field is empty', async () => {
    render(<Signin />)
    const password_input = screen.getByPlaceholderText(
      'Digite aqui a sua Senha',
    )
    const button = screen.getByRole('button', { name: 'entrar' })

    await waitFor(() => {
      fireEvent.change(password_input, { target: { value: '123456' } })
      fireEvent.click(button)
    })
    expect(
      await screen.findByText('O e-mail é obrigatório'),
    ).toBeInTheDocument()
  })

  it('should show error messages when email field is invalid', async () => {
    render(<Signin />)
    const email_input = screen.getByPlaceholderText('Digite aqui o seu E-mail')
    const button = screen.getByRole('button', { name: 'entrar' })

    await waitFor(() => {
      fireEvent.click(button)
    })

    expect(
      await screen.findByText('O e-mail é obrigatório'),
    ).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.change(email_input, { target: { value: 'bruce' } })
      fireEvent.click(button)
    })

    expect(email_input).toHaveValue('bruce')
    expect(
      await screen.findByText('Digite um e-mail válido'),
    ).toBeInTheDocument()
  })

  it('should be able to clean form when submit form', async () => {
    render(<Signin />)

    const email_input = screen.getByPlaceholderText('Digite aqui o seu E-mail')
    const password_input = screen.getByPlaceholderText(
      'Digite aqui a sua Senha',
    )
    const button = screen.getByRole('button', { name: 'entrar' })

    await waitFor(() => {
      fireEvent.change(email_input, { target: { value: 'bruce@email.com' } })
      fireEvent.change(password_input, { target: { value: '123456' } })
      fireEvent.click(button)
    })

    expect(
      screen.getByPlaceholderText('Digite aqui o seu E-mail'),
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Digite aqui a sua Senha'),
    ).toBeInTheDocument()
  })
})
