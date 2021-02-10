import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders dashboard h2', () => {
  render(<Dashboard />);
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(screen.getByText('Signout')).toBeInTheDocument();
  expect(screen.getByText('Use Fake Data')).toBeInTheDocument();
  expect(screen.getByText('Resolve adminemail')).toBeInTheDocument();
});