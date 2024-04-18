import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Queries from './queries';
import Navv from './nav';
import Register from './register';
import Login from './login';
import FilteredChannels from './channelsFiltering'
import Favorites from './favorite';
import Longitude from './Longitude';
function App() {

  return (
    <BrowserRouter>
    <Navv />
      <Routes>
          <Route path="/" element={<Queries />}/>
          <Route path="/channels" element={<FilteredChannels />}/>
          <Route path="/longitude" element={<Longitude />}/>
          <Route path="/favorite" element={<Favorites />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<Queries />}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
