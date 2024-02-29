import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'

import Signin from './../index'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}))

describe('<Signin />', () => {
  it('should be able to render the Signin screen correctly', () => {
    render(<Signin />)
    const text_login = screen.getByText('Login')
    const input_email = screen.getByPlaceholderText('Digite aqui seu e-mail')
    const input_password = screen.getByPlaceholderText('Digite aqui sua senha')
    const submit_button = screen.getByText('Entrar')
    const register_link = screen.getByText('Não tem cadastro? Cadastre agora')

    expect(text_login).toBeTruthy()
    expect(input_email).toBeTruthy()
    expect(input_password).toBeTruthy()
    expect(submit_button).toBeTruthy()
    expect(register_link).toBeTruthy()
  })

  it('should be able to show an error when the inputs are empty', async () => {
    render(<Signin />)
    const submit_button = screen.getByText('Entrar')

    await waitFor(() => {
      fireEvent.press(submit_button)
    })
    const input_email_error = screen.getByText('O e-mail é obrigatório')
    const input_password_error = screen.getByText('A senha é obrigatório')

    expect(input_email_error).toBeTruthy()
    expect(input_password_error).toBeTruthy()
  })

  it('should be able to show an error when the email is invalid', async () => {
    render(<Signin />)
    const input_email = screen.getByPlaceholderText('Digite aqui seu e-mail')
    const submit_button = screen.getByText('Entrar')

    await waitFor(() => {
      fireEvent.changeText(input_email, 'bruce')
      fireEvent.press(submit_button)
    })
    const input_email_error = screen.getByText('Digite um e-mail válido')

    expect(input_email_error).toBeTruthy()
  })
})
