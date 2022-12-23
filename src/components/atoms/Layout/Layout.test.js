import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('renders the header', () => {
    render(<Layout />);

    expect(screen.getByRole('header')).toBeInTheDocument();
  });

  it('renders its children', () => {
    const text = 'Hello, world!';

    render(<Layout>{text}</Layout>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
