import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div> { }this is the dashboard </div>
    )
}

export default Dashboard;