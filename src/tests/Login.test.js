import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import { store } from '../store';

function renderWithProvider(element) {
    render(
      <Provider store={store}>
        <BrowserRouter>
          { element }
        </BrowserRouter>
      </Provider>
    );
  }

  describe('Test usage of Login page', () => {
    it('Should get email input value', () => {
      renderWithProvider(<Login />);

      const emailInput = screen.getByTestId('email-input-id');

      fireEvent.change(emailInput, { target : {
        value: 'myTest@gmail.com'
      }});

      expect(emailInput).toHaveValue('myTest@gmail.com')

    });

    it('Should get password input value', () => {
      renderWithProvider(<Login />);

      const passwordInput = screen.getByTestId('password-input-id');

      fireEvent.change(passwordInput, { target : {
        value: 'password123'
      }});

      expect(passwordInput).toHaveValue('password123')

    });

    it('Should have both entries when clicking the login button', () => {
      renderWithProvider(<Login />);

      const passwordInput = screen.getByTestId('password-input-id');
      const emailInput = screen.getByTestId('email-input-id');
      const loginButton = screen.getByTestId('login-button');

      expect(loginButton).toBeInTheDocument();

      fireEvent.change(emailInput, { target : {
        value: 'myTest@gmail.com'
      }});

      fireEvent.change(passwordInput, { target : {
        value: 'password123'
      }});

      fireEvent.click(loginButton);

      expect(passwordInput).toHaveValue('password123')
      expect(emailInput).toHaveValue('myTest@gmail.com')
    });

    it('Should email and password error message appear', () => {
      renderWithProvider(<Login />);

      const passwordInput = screen.getByTestId('password-input-id');
      const emailInput = screen.getByTestId('email-input-id');
      const loginButton = screen.getByTestId('login-button');

      expect(loginButton).toBeInTheDocument();

      fireEvent.change(emailInput, { target : {
        value: 'testError'
      }});

      fireEvent.change(passwordInput, { target : {
        value: 'pass1'
      }});

      fireEvent.click(loginButton);

      const loginPage = screen.getByTestId('login-page');
  
      expect(loginPage).toBeInTheDocument('Formato de email inválido');

      expect(loginPage).toBeInTheDocument('A senha deve conter no mínimo 8 caracteres letras maiúsculas, minúsculas e pelo menos 1 caracter especial');

    });
  });