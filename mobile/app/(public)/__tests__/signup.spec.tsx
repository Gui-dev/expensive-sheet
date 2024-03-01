import {
  // fireEvent,
  render,
  screen,
  // waitFor,
} from '@testing-library/react-native'

import Signup from './../signup'

describe('<Signup />', () => {
  it('should be able to render the Signup screen correctly', () => {
    render(<Signup />)
    const text_login = screen.getByText('Cadastro')
    const input_name = screen.getByPlaceholderText('Digite aqui seu nome')
    const input_email = screen.getByPlaceholderText('Digite aqui seu e-mail')
    const input_password = screen.getByPlaceholderText('Digite aqui sua senha')
    const submit_button = screen.getByText('Cadastrar')
    const register_link = screen.getByText('Já tem cadastro? faça login')

    expect(text_login).toBeTruthy()
    expect(input_name).toBeTruthy()
    expect(input_email).toBeTruthy()
    expect(input_password).toBeTruthy()
    expect(submit_button).toBeTruthy()
    expect(register_link).toBeTruthy()
  })
})
