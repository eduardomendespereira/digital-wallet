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

      const openModalInsertExpenseButton = screen.getByTestId('insert-expense-button')

      fireEvent.click(openModalInsertExpenseButton);

      const inputDescription = screen.getByTestId('description-input-id')

      fireEvent.change(inputDescription, { target : {
        value: 'compras do mes'
      }});

      expect(inputDescription).toHaveValue('compras do mes');
    });

    it('Shoud get value input value', () => {
      renderWithProvider(<Wallet />);

      const openModalInsertExpenseButton = screen.getByTestId('insert-expense-button')

      fireEvent.click(openModalInsertExpenseButton);

      const inputValue = screen.getByTestId('value-input-id')

      fireEvent.change(inputValue, { target : {
        value: 10
      }});

      expect(inputValue).toHaveValue(10);
    });

    it('Shoud get value input coin', () => {
      renderWithProvider(<Wallet />);

      const openModalInsertExpenseButton = screen.getByTestId('insert-expense-button')

      fireEvent.click(openModalInsertExpenseButton);

      const inputCoin = screen.getByTestId('coin-input-id')

      fireEvent.change(inputCoin, { target : {
        value: 'USD'
      }});

      expect(inputCoin).toHaveValue('USD');
    });

    // it('Shoud get value input payment', () => {
    //   renderWithProvider(<Wallet />);

    //   const openModalInsertExpenseButton = screen.getByTestId('insert-expense-button')

    //   fireEvent.click(openModalInsertExpenseButton);

    //   const inputPayment = screen.getByTestId('payment-input-id')

    //   fireEvent.change(inputPayment, { target : {
    //     value: 'Dinheiro'
    //   }});

    //   expect(inputPayment).toHaveValue('Dinheiro');
    // });
  });