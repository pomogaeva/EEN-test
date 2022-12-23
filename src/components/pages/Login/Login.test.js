import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

jest.mock('./Login', () => ({
  baseUrl: 'http://rest.cameramanager.com'
}));

describe('Login', () => {
  it('displays the login form', () => {
    render(<Login />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('logs the user in and redirects to the cameras page when the form is submitted', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => ({ access_token: '123' }),
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/log in/i));

    await screen.findByText(/cameras/i);
  });

  it('displays an error message if the login fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to log in'));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/log in/i));

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('redirects to the cameras page if the user is authenticated', () => {
    localStorage.setItem('access_token', '123');

    render(<Login />);

    expect(screen.getByText(/cameras/i)).toBeInTheDocument();
  });

})