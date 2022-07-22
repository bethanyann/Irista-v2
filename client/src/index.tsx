import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import apollo client 
import client from './apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import 'antd/dist/antd.css'; 
 
// React application needs access to:
// Client (ApolloProvider), 
// Authorization Context,
// Browser Router


ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App/>  
    </ApolloProvider> 
  </Router> 
  ,document.getElementById('root')
);

