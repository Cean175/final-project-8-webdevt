import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './H.management/login'; 
import Header from './components/Header';  
import Home from './components/Home';  
import Booking from './components/Booking'; 
import Contact from './components/Contact';  
import Rooms from './components/Rooms';  
import Admin from './components/admin_component/admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true); 
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      {isLoggedIn && <Header />}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin" element={<Admin />} />
        <Route 
          path="/home" 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />
        
        <Route 
          path="/rooms" 
          element={<ProtectedRoute><Rooms /></ProtectedRoute>} 
        />
        <Route 
          path="/booking" 
          element={<ProtectedRoute><Booking /></ProtectedRoute>} 
        />
        <Route 
          path="/contact" 
          element={<ProtectedRoute><Contact /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;