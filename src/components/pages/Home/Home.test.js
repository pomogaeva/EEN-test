import { render, screen, within } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders the Layout component', () => {
    render(<Home />);

    const layout = screen.getByText(/welcome to the cameramanager/i);
    within(layout).getByText(/layout/i);
  });
});
