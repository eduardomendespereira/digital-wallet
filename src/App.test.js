import { render, screen } from '@testing-library/react';
import App from './App';

describe('Test sanity of routes', () => {
  beforeEach(() => {
    const currentState = window.history.state;

    window.history.replaceState(currentState, '', '/');
  });

  it('Should render information page when the path is /', () => {
    window.history.pushState({}, 'Login page', '/');
  
    render(<App />);
  
    const informationPage = screen.getByTestId('login-page');
  
    expect(informationPage).toBeInTheDocument();
  });
});
