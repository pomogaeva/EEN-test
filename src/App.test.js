import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the correct routes', () => {
    render(<App />);

    // Check that the Cameras route is rendered
    expect(screen.getByText(/cameras/i)).toBeInTheDocument();

    // Check that the Camera route is rendered
    expect(screen.getByText(/camera/i)).toBeInTheDocument();

    // Check that the Login route is rendered
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
