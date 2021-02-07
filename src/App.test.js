import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import App from './App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}

test('landing on dashboard page', () => {
  const {getByText} = renderWithRouter(<App />, { route: '/dashboard' })
  ;
  const element = getByText('Dashboard');
  expect(element).toBeInTheDocument();
});

test('landing on bad page', () => {
  const {getByText} = renderWithRouter(<App />, { route: '/something-that-does-not-match' })
  ;
  const element = getByText('No Match');
  expect(element).toBeInTheDocument();
});