import React, { useContext } from 'react';
//context
import { AuthContext } from '../context/authContext';
import { User } from '../models/types';
//components
import Landing from '../components/Landing/landing';



const Home = () => {
    const { user, login } = useContext(AuthContext);
    //cast user to User type until I can get context switched over to ts file
    const loggedInUser: User | null = user ? user : null;

    console.log(loggedInUser);
    
    // if(Object.keys(user!).length === 0){
    //     return (
    //         <div>
    //             This will be the main dashboard view
    //         </div>
    //     )
    // }
    // else {
        return (
            <Landing />
        )
    // }

}

export default Home;


