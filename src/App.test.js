import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: BrowserRouter })
}

test('landing on login page', () => {
  const {getByText} = renderWithRouter(<App />, { route: '/' })
  ;
  const element = getByText('Please Log In');
  expect(element).toBeInTheDocument();
});

test('landing on dashboard page return to login page', () => {
  const {getByText} = renderWithRouter(<App />, { route: '/dashboard' });
  const element = getByText('Please Log In');
  expect(element).toBeInTheDocument();
});

test('landing on bad page', () => {
  const {getByText} = renderWithRouter(<App />, { route: '/something-that-does-not-match' })
  ;
  const element = getByText('No Match');
  expect(element).toBeInTheDocument();
});