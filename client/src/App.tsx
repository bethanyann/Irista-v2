import React, { useContext } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, AuthContext } from  './context/authContext';
import { GlobalStyle } from './GlobalStyles';
//components
import Home from './components/Home';
import Navbar from './components/Navbar/navbar';
import Register from './components/Register/register';
import Login from './components/Login/login';
import Album from './components/Album/album';
import Photo from './components/Photo/photo';
import Upload from './components/Upload/upload';
import Landing from './components/Landing/landing';
import WithNav from './components/Navbar/withNav';
import WithoutNav from './components/Navbar/withoutNav';

export default function App() {

  //get user here 
  const { user } = useContext(AuthContext);

 
  return (
        <AuthProvider>
           
            <Routes>
              <Route element={<WithNav />} >
                <Route path='/home' element={<Home />} /> 
                <Route path='/login' element={<Login/>}/> 
                <Route path='/register' element={<Register />} /> 
                <Route path='/photos' element={<Photo />}/>
                <Route path='/albums' element={<Album />}/>
                <Route path='/upload' element={<Upload />}/>
              </Route>  
              <Route element={<WithoutNav />}>
                <Route path='/' element={<Landing />} />  
              </Route>
            </Routes>
          <GlobalStyle />
        </AuthProvider>
  );
}

//  //if the user is logged in render, 
//  if(user){
//   return <Component {...rest} {...props} />
// }
// else {
//   //redirect to public page if user is not logged in
//  return <Navigate to={{pathname: "/" }}/>
// }

