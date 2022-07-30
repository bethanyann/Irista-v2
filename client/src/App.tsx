import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from  './context/authContext';
import { isEmpty } from 'lodash';
import { GlobalStyle } from './GlobalStyles';
//route protection
import RequireAuth from './context/requireAuth';
//components
import Register from './pages/Register/register';
import Login from './pages/Login/login';
import AlbumGrid from './pages/AlbumGrid/albumGrid';
import PhotoGrid from './pages/PhotoGrid/photoGrid';
import UploadPage from './pages/Upload/uploadPage';
import Landing from './pages/Landing/landing';
import AlbumPhotos from './pages/AlbumPhotos/albumPhotos';
import { WithNav, WithoutNav } from './components/Navbar/navbarDisplay';

export default function App() {
  return (
        <AuthProvider>
            <Routes>
              <Route element={<WithNav />} >
                <Route path='/login' element={<Login/>}/> 
                <Route path='/register' element={<Register />} /> 
                <Route path='/photos' element={<RequireAuth><PhotoGrid/></RequireAuth>}/>
                <Route path='/albums' element={<RequireAuth><AlbumGrid/></RequireAuth>}/>
                <Route path='/upload' element={<RequireAuth><UploadPage/></RequireAuth>}/>
                <Route path='/album/:albumName' element={<RequireAuth><AlbumPhotos /></RequireAuth>} />
              </Route>  
              <Route element={<WithoutNav />}>
                <Route path='/' element={<Landing />} />
              </Route>
            </Routes>
          <GlobalStyle />
        </AuthProvider>
  );
}