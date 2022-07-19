import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from  './context/authContext';
import { isEmpty } from 'lodash';
import { GlobalStyle } from './GlobalStyles';
//route protection
import RequireAuth from './context/requireAuth';
//components
import Dashboard from './components/Dashboard';
import Register from './components/Register/register';
import Login from './components/Login/login';
import Album from './components/Album/album';
import Photo from './components/Photo/photo';
import Upload from './components/Upload/upload';
import Landing from './components/Landing/landing';
import { WithNav, WithoutNav } from './components/Navbar/navbarDisplay';

export default function App() {
  return (
        <AuthProvider>
            <Routes>
              <Route element={<WithNav />} >
                {/* TODO: turn the home component into the dashboard component because I don't really need a 'home' component*/}
                <Route path='/dashboard' element={ <RequireAuth><Dashboard/></RequireAuth>} />  
                <Route path='/login' element={<Login/>}/> 
                <Route path='/register' element={<Register />} /> 
                <Route path='/photos' element={<RequireAuth><Photo/></RequireAuth>}/>
                <Route path='/albums' element={<RequireAuth><Album/></RequireAuth>}/>
                <Route path='/upload' element={<RequireAuth><Upload/></RequireAuth>}/>
              </Route>  
              <Route element={<WithoutNav />}>
                <Route path='/' element={<Landing />} />  
              </Route>
            </Routes>
          <GlobalStyle />
        </AuthProvider>
  );
}