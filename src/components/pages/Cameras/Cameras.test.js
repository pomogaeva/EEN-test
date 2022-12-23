import { render, screen, fireEvent } from '@testing-library/react';
import Cameras from './Cameras';
import { fetchCameras } from '../../../slice/camerasSlice';
import { baseUrl } from '../Login/Login';

jest.mock('../../../slice/camerasSlice');
jest.mock('../Login');

describe('Cameras', () => {
  it('redirects to the login page if the user is not authenticated', () => {
    localStorage.removeItem('access_token');

    render(<Cameras />);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('displays a list of cameras if the user is authenticated', async () => {
    localStorage.setItem('access_token', '123');
    baseUrl.mockReturnValue('http://localhost:3000');
    fetchCameras.mockResolvedValue({ payload: [{ id: '1', name: 'Camera 1' }, { id: '2', name: 'Camera 2' }] });

    render(<Cameras />);

    await screen.findByText(/camera 1/i);
    await screen.findByText(/camera 2/i);
  });

  it('displays an error message if the cameras fail to load', async () => {
    localStorage.setItem('access_token', '123');
    fetchCameras.mockRejectedValue(new Error('Failed to load cameras'));

    render(<Cameras />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('navigates to the correct camera page when a camera is clicked', async () => {
    localStorage.setItem('access_token', '123');
    fetchCameras.mockResolvedValue({ payload: [{ id: '1', name: 'Camera 1' }, { id: '2', name: 'Camera 2' }] });

    render(<Cameras />);

    const camera1Link = await screen.findByText(/camera 1/i);
    fireEvent.click(camera1Link);

    expect(screen.getByText(/camera 1/i)).toBeInTheDocument();
  });
});
