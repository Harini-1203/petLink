import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import Main from './pages/Main';
import AddPet from './pages/AddPet';
import SinglePet from './pages/SinglePet';
import Profile from './pages/Profile';
import ProtectedRoute from './Auth/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import './index.css'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path="/addPet" element={<ProtectedRoute><AddPet /></ProtectedRoute>} />
        <Route path="/pets/:id" element={<ProtectedRoute><SinglePet /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />    
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
