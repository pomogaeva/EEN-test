import { createSlice } from '@reduxjs/toolkit';

const camerasSlice = createSlice({
  name: 'cameras',
  initialState: [],
  reducers: {
    setCameras: (state, action) => {
      return action.payload;
    },
    setSingleCamera: (state, action) => {
      return action.payload;
    }
  },
});

export const { setCameras, setSingleCamera } = camerasSlice.actions;

const baseUrl = 'https://rest.cameramanager.com/rest/v2.4';

export const fetchCameras = () => async (dispatch) => {
  await fetch(`${baseUrl}/cameras`)
    .then((response) => response.json())
    .then(res =>
      dispatch(setCameras(res.data.cameras)
      ))
    .catch((error) => {
      console.error(error);
    });
};

export const fetchSingleCamera = (cameraId) => async (dispatch) => {
  await fetch(`${baseUrl}/cameras/${cameraId}`)
    .then((response) => response.json())
    .then((res) => dispatch(setSingleCamera(res.data.camera)))
    .catch((error) => {
      console.error(error);
    });
};

export default camerasSlice.reducer;
