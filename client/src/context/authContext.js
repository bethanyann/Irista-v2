import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

//TODO - confirm that these are the only fields in the token I need? 
// interface token {
//     id: string,
//     email: string,
//     username: string,
//     iat: string,
//     exp: number
// }

const initialState = {
    user: {}
}

if(localStorage.getItem("token")) {
    //if a token exists in storage, decode it
    const decodedToken = jwtDecode(localStorage.getItem("token"));

     //check the expiration time of the token
     if(decodedToken.exp * 1000 < Date.now()){
        //if token is expired, remove from the local storage
        localStorage.removeItem("token");
    } else {
        //we have a valid token, so set user in the initial state to token
        initialState.user = decodedToken;
    }
}

//create the defs of the functions and user object that the context will take 
const AuthContext = createContext({
    user: null, 
    login: (userData) => {},
    logout: () => {}
});

//create authReducer that takes the current state and the current action 
//it recieves an action with a type and a payload and then it determines what to do with it
//it also takes the state because it needs to be able to change the state
function authReducer(state, action){
    switch(action.type)
    {
        case 'LOGIN':
            return {
                //current state
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state, 
                user: null
            }
        default:
            return state;
    }
}

//this is what the rest of the application will use/see
//now we need to use this reducer somewhere, and we will use it in the AuthProvider
function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);

    //define the functions that are referenced in the AuthContext above
    //this function is not the login function, its what to do after a successful login 
    //these can be passed down through the component tree
    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.clear();
        dispatch({
            type: 'LOGOUT'
        })
    }

    //return context as a react element
    return(
        <AuthContext.Provider  value={{user: state.user, login, logout}} {...props}/>
    )
}

export { AuthContext, AuthProvider }