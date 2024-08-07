import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Intro from './components/Intro.js';
import { LoginProvider } from './components/Login/LoginContext.js';

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists in localStorage

  return (
    <LoginProvider>
      <Router>
        <Routes>
          {/* Redirect to intro page if authenticated */}
          {isAuthenticated && <Route path="/login" element={<Navigate to="/intro" />} />}
          {/* Redirect to login page if not authenticated */}
          {!isAuthenticated && <Route path="/" element={<Navigate to="/login" />} />}
          {!isAuthenticated && <Route path="/intro" element={<Navigate to="/login" />} />}
          <Route path="/login" element={<Login />} />
          {/* Show Intro component only if authenticated */}
          {isAuthenticated && <Route path="/intro" element={<Intro />} />}
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;
