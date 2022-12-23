import { createSlice, createStore } from '@reduxjs/toolkit';
import { fetchCameras, fetchSingleCamera } from './camerasSlice';

jest.mock('./camerasSlice', () => ({
  fetchCameras: jest.fn(),
  fetchSingleCamera: jest.fn(),
}));

describe('camerasSlice', () => {
  let store;
  let camerasSlice;

  beforeEach(() => {
    camerasSlice = createSlice({
      name: 'cameras',
      initialState: [],
      reducers: {
        setCameras: (state, action) => action.payload,
        setSingleCamera: (state, action) => action.payload,
      },
      extraReducers: {
        [fetchCameras.fulfilled]: (state, action) => {
          state.push(...action.payload);
        },
        [fetchSingleCamera.fulfilled]: (state, action) => {
          state.push(action.payload);
        },
      },
    });
    store = createStore(camerasSlice.reducer);
  });

  it('fetches cameras', async () => {
    const cameras = [{ id: 1, name: 'Camera 1' }, { id: 2, name: 'Camera 2' }];
    fetchCameras.mockResolvedValue({ payload: cameras });
    await store.dispatch(fetchCameras());

    expect(store.getState()).toEqual(cameras);
  });

  it('fetches a single camera', async () => {
    const camera = { id: 1, name: 'Camera 1' };
    fetchSingleCamera.mockResolvedValue({ payload: camera });
    await store.dispatch(fetchSingleCamera(1));

    expect(store.getState()).toEqual([camera]);
  });
});