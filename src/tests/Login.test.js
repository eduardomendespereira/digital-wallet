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
  });