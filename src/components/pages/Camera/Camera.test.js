import { render, screen } from '@testing-library/react';
import Camera from './Camera';
import { fetchSingleCamera } from '../../../slice/camerasSlice';

jest.mock('../../../slice/camerasSlice');

describe('Camera', () => {
  it('renders the loading state when the camera is not yet loaded', () => {
    render(<Camera />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders the camera details when the camera is loaded', async () => {
    const camera = {
      cameraId: '123',
      name: 'Test Camera',
      deviceTypeId: 'abc',
      ethMacAddress: '00:11:22:33:44:55',
    };
    fetchSingleCamera.mockResolvedValue({ payload: camera });

    render(<Camera />);

    await screen.findByText(/test camera/i);

    expect(screen.getByText(/123/i)).toBeInTheDocument();
    expect(screen.getByText(/abc/i)).toBeInTheDocument();
    expect(screen.getByText(/00:11:22:33:44:55/i)).toBeInTheDocument();
  });

  it('displays an error message when the camera fails to load', async () => {
    fetchSingleCamera.mockRejectedValue(new Error('Failed to load camera'));

    render(<Camera />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
