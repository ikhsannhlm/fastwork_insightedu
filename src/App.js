import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './PrivateRoute';
import Homepage from './views/Homepage';
import { Signin } from './views/Signin';
import Signup from './views/Signup';
import { PersonalityTest } from './views/PersonalityTest';
import { Result } from './views/Result';
import { Dashboard } from './views/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/personalitytest' element={<PrivateRoute component={PersonalityTest} />} />
        <Route path='/result' element={<PrivateRoute component={Result} />} />
        <Route path='/dashboard' element={<PrivateRoute component={Dashboard} />} /> {/* Tambahkan route untuk halaman Dashboard */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
