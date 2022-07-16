import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from  './context/authContext';
import { GlobalStyle } from './GlobalStyles';

//components
import Home from './components/Home';
import Navbar from './components/Navbar/navbar'
export default function App() {
  return (
        <AuthProvider>
          
          {/* <Navigation className="sticky-nav"/> */}
          <Navbar />
          <Routes>
              <Route path='/' element={<Home />} /> 
              {/* <Route  path='login' element={<Login/>}/>
              <Route path='register' element={<Register />} /> */}
          </Routes>
          <GlobalStyle />
        </AuthProvider>
  );
}
