import { render, screen } from '@testing-library/react';
import Dashboard from '../../../../../components/pages/auth/Dashboard/Dashboard';

test('renders dashboard h2', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});