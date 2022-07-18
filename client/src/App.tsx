import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from  './context/authContext';
import { GlobalStyle } from './GlobalStyles';
//components
import Home from './components/Home';
import Navbar from './components/Navbar/navbar';
import Register from './components/Register/register';
import Login from './components/Login/login';
import Album from './components/Album/album';
import Photo from './components/Photo/photo';
import Upload from './components/Upload/upload';

import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
        <AuthProvider>
          {/* <Navigation className="sticky-nav"/> */}
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route  path='login' element={<Login/>}/> 
            <Route path='/register' element={<Register />} /> 
              <ProtectedRoute path='/photos' exact element={<Photo />}/>
              <ProtectedRoute path='/albums' exact element={<Album />}/>
              <ProtectedRoute path='/upload' exact element={<Upload />}/>
          </Routes>
          <GlobalStyle />
        </AuthProvider>
  );
}

