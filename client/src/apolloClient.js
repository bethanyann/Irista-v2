import { ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//create a link to the apollo server in the backend
const httpLink = createHttpLink({
    uri: "https://irista-app.herokuapp.com",
    //uri: "http://localhost:5000"
});

//create authorization link that allows us to pass in auth via a header 
const authLink = setContext((_, { headers }) => {
    //get token from local storage and add to the Authorization header
    const token = localStorage.getItem('jwtToken');
       
    return { 
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ' '
        }
    }
});

//now create the actual client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

//export the client so that the react app can use it
export default client; 