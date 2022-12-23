import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { setCameras, setSingleCamera } from './slice/camerasSlice';

const store = createStore(() => ({
    cameras: setCameras,
    singleCamera: setSingleCamera
}));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);