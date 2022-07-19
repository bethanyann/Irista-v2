import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { isEmpty } from 'lodash';

const RequireAuth = ({children}) => {
    const { user } = useContext(AuthContext); 
    const isUserLoggedOut = isEmpty(user);  

    return isUserLoggedOut ? <Navigate to='/' replace /> : children

}

export default RequireAuth;