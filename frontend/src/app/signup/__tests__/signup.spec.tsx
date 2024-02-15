import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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

  it('should show error messages when name field is empty', async () => {
    render(<Signup />)
    const email_input = screen.getByPlaceholderText('Digite aqui o seu E-mail')
    const password_input = screen.getByPlaceholderText(
      'Digite aqui a sua Senha',
    )

    const button = screen.getByRole('button', { name: 'registrar' })

    await waitFor(() => {
      fireEvent.change(email_input, { target: { value: 'bruce@email.com' } })
      fireEvent.change(password_input, { target: { value: '123456' } })
      fireEvent.click(button)
    })
    expect(await screen.findByText('O nome é obrigatório')).toBeInTheDocument()
  })

  it('should show error messages when email field is empty', async () => {
    render(<Signup />)
    const name_input = screen.getByPlaceholderText('Digite aqui o seu Nome')
    const password_input = screen.getByPlaceholderText(
      'Digite aqui a sua Senha',
    )

    const button = screen.getByRole('button', { name: 'registrar' })

    await waitFor(() => {
      fireEvent.change(name_input, { target: { value: 'Bruce Wayne' } })
      fireEvent.change(password_input, { target: { value: '123456' } })
      fireEvent.click(button)
    })
    expect(
      await screen.findByText('O e-mail é obrigatório'),
    ).toBeInTheDocument()
  })

  it('should show error messages when password field is empty', async () => {
    render(<Signup />)
    const name_input = screen.getByPlaceholderText('Digite aqui o seu Nome')
    const email_input = screen.getByPlaceholderText('Digite aqui o seu E-mail')

    const button = screen.getByRole('button', { name: 'registrar' })

    await waitFor(() => {
      fireEvent.change(name_input, { target: { value: 'Bruce Wayne' } })
      fireEvent.change(email_input, { target: { value: 'bruce@email.com' } })
      fireEvent.click(button)
    })
    expect(
      await screen.findByText('Sua senha deve ter no mínimo 6 caracteres'),
    ).toBeInTheDocument()
  })

  it('should show error messages when email field is invalid', async () => {
    render(<Signup />)
    const email_input = screen.getByPlaceholderText('Digite aqui o seu E-mail')
    const button = screen.getByRole('button', { name: 'registrar' })

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
})
