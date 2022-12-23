import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cameras from './components/pages/Cameras/Cameras';
import Camera from './components/pages/Camera/Camera';
import Login from './components/pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cameras' exact element={<Cameras />} />
        <Route path='/cameras/:cameraId' element={<Camera />} />
        <Route path='/login' exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;