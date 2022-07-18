import { fromPromise } from '@apollo/client';
import React, { Component, useContext }from 'react';
import { Route, Navigate} from 'react-router-dom';
import { AuthContext } from './../context/authContext';

{/* <Route path="/redirect" element={ <Navigate to="/error-page" /> } /> */}

const ProtectedRoute = ({ component , ...rest} : any) => {

    const { user } = useContext(AuthContext);
    return(
        <>
            <Route
                {...rest}
                render={(props:any) => {
                    //if the user is logged in render, 
                    if(user){
                        return <Component {...rest} {...props} />
                    }
                    else {
                        //redirect to public page if user is not logged in
                       return <Navigate to={{pathname: "/" }}/>
                    }

                }}            
            />
        </>
    )
}

export default ProtectedRoute;