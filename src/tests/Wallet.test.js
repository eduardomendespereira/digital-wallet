import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
 import Wallet from '../pages/wallet/Wallet';
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

  describe('Tests user interactions in modal insert expense', () => {
    it('Shoud get description input value', () => {
      renderWithProvider(<Wallet />);

      const insertExpenseButton = screen.getByTestId('insert-expense-button')

      fireEvent.click(insertExpenseButton);

      const inputDescription = screen.getByTestId('description-input')

      fireEvent.change(inputDescription, { target : {
        value: 'compras do mes'
      }});

      expect(inputDescription).toHaveValue('compras do mes');
    });
  });