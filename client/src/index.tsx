import ReactDOM from 'react-dom';
import App from './App';
//import apollo client 
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css'; 
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

// React application needs access to:
// Client (ApolloProvider), 
// Authorization Context,
// Browser Router
// React Query Client Provider


ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <App/> 
      </QueryClientProvider> 
    </ApolloProvider> 
  </Router> 
  ,document.getElementById('root')
);

