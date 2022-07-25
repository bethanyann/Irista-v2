import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from  './context/authContext';
import { isEmpty } from 'lodash';
import { GlobalStyle } from './GlobalStyles';
//route protection
import RequireAuth from './context/requireAuth';
//components
import Dashboard from './pages/Dashboard';
import Register from './pages/Register/register';
import Login from './pages/Login/login';
import Album from './pages/Album/album';
import PhotoGrid from './pages/PhotoGrid/photoGrid';
//import PhotoInfo from './pages/PhotoInfo/photoInfo';
import Upload from './pages/Upload/upload';
import Landing from './pages/Landing/landing';
import { WithNav, WithoutNav } from './components/Navbar/navbarDisplay';

export default function App() {
  return (
        <AuthProvider>
            <Routes>
              <Route element={<WithNav />} >
                <Route path='/dashboard' element={ <RequireAuth><Dashboard/></RequireAuth>} />  
                <Route path='/login' element={<Login/>}/> 
                <Route path='/register' element={<Register />} /> 
                <Route path='/photos' element={<RequireAuth><PhotoGrid/></RequireAuth>}/>
                <Route path='/albums' element={<RequireAuth><Album/></RequireAuth>}/>
                <Route path='/upload' element={<RequireAuth><Upload/></RequireAuth>}/>
                {/* <Route path='photo/:photoId' element={<RequireAuth><PhotoInfo/></RequireAuth>} /> */}
              </Route>  
              <Route element={<WithoutNav />}>
                <Route path='/' element={<Landing />} />  
              </Route>
            </Routes>
          <GlobalStyle />
        </AuthProvider>
  );
}