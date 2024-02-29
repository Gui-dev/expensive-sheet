import { render, screen } from '@testing-library/react-native'

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
})
