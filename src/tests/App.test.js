import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Test sanity of routes', () => {
  beforeEach(() => {
    const currentState = window.history.state;

    window.history.replaceState(currentState, '', '/');
  });

  it('Should render information page when the path is /', () => {
    window.history.pushState({}, 'Login page', '/');
  
    render(<App />);
  
    const loginPage = screen.getByTestId('login-page');
  
    expect(loginPage).toBeInTheDocument();
  });

  it('Should render wallet page when the path is /wallet', () => {
    window.history.pushState({}, 'Wallet page', '/wallet');
  
    render(<App />);
  
    const walletPage = screen.getByTestId('wallet-id');
  
    expect(walletPage).toBeInTheDocument();
  });
});
