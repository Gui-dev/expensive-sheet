import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'

import Signup from '../signup'

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

  it('should be able to show an error when the inputs are empty', async () => {
    render(<Signup />)
    const submit_button = screen.getByText('Cadastrar')

    await waitFor(() => {
      fireEvent.press(submit_button)
    })
    const input_name_error = screen.getByText('O nome é obrigatório')
    const input_email_error = screen.getByText('O e-mail é obrigatório')
    const input_password_error = screen.getByText('A senha é obrigatório')

    expect(input_name_error).toBeTruthy()
    expect(input_email_error).toBeTruthy()
    expect(input_password_error).toBeTruthy()
  })

  it('should be able to show an error when the email is invalid', async () => {
    render(<Signup />)
    const input_email = screen.getByPlaceholderText('Digite aqui seu e-mail')
    const submit_button = screen.getByText('Cadastrar')

    await waitFor(() => {
      fireEvent.changeText(input_email, 'bruce')
      fireEvent.press(submit_button)
    })
    const input_email_error = screen.getByText('Digite um e-mail válido')

    expect(input_email_error).toBeTruthy()
  })

  it('should be able to show an error when the password is less than 6', async () => {
    render(<Signup />)
    const input_password = screen.getByPlaceholderText('Digite aqui sua senha')
    const submit_button = screen.getByText('Cadastrar')

    await waitFor(() => {
      fireEvent.changeText(input_password, '123')
      fireEvent.press(submit_button)
    })
    const input_password_error = screen.getByText(
      'Sua senha deve ter no mínimo 6 caracteres',
    )

    expect(input_password_error).toBeTruthy()
  })
})
