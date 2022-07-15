import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from  './context/authContext';
import './App.css';
//components
import Home from './components/Home';

export default function App() {
  return (
        <AuthProvider>
          {/* <Navigation className="sticky-nav"/> */}
          <Routes>
              <Route path='/' element={<Home />} /> 
              {/* <Route  path='login' element={<Login/>}/>
              <Route path='register' element={<Register />} /> */}
           </Routes>
       
        </AuthProvider>
  );
}
