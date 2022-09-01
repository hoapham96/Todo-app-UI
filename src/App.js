import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, {useState} from 'react';
import Header from './components/Header';
import Home from './pages/Home.js';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken = {setToken}/>
  }

  return (
    <Router>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;