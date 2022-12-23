import { render, screen, fireEvent, within } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('displays the log out button', () => {
    render(<Header />);

    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });

  it('displays the cameras link', () => {
    render(<Header />);

    const link = within(screen.getByText(/cameras/i)).getByRole('link');

    expect(link).toHaveAttribute('href', '/cameras');
  });

  it('logs the user out and redirects to the login page when the log out button is clicked', () => {
    render(<Header />);

    fireEvent.click(screen.getByText(/log out/i));

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

});
