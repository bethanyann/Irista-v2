import React, { useState, useContext } from 'react';
import { gql } from 'graphql-tag';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
//styles
import { Wrapper, Content, FormStyle } from './login.styles';
//authContext
import { AuthContext } from '../../context/authContext';
//hooks
import { useForm } from '../../utilities/formHook';


const LOGIN_USER = gql`
    mutation login( $loginInput: LoginInput ) {
        loginUser( loginInput: $loginInput ) {
            email
            username
            token
        }
    }
`;

//set default values
const initialState = {
    username:'',
    password:'',
}

const Login = ( props:any ) => {
    //gives us access to anything in our context, like the login functions 
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    //call useform hook and get the form values here to be submitted in the register user mutation
    const { onChange, onSubmit, values} = useForm(loginUserCallback, initialState);

    //mutation here
    const [ loginUser, {error, loading} ] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData }}) {
            context.login(userData);

            //redirect to homepage after successful login
            navigate('/dashboard', {replace: true});
        }, 
        onError({graphQLErrors}) {
            debugger;
            if(graphQLErrors.length > 0)
            {
                //TODO - see if its a frontend or backend error as the backend errors come back differently and are messing this up
                //backend = graphQLErrors[0].message = "A user with that email already exists"
                var backendError = error?.message;
                var errors = graphQLErrors[0].extensions.errors as [];
                setErrors(errors);
                console.log(errors);
            }
        },
        variables: { loginInput: values }
    })

    //very helpful if you remember to call the mutation
    function loginUserCallback() {
        loginUser();
    }
    
    //frontend form 
    return (
        <Wrapper>
            <Content>
                <FormStyle>
                    <h2> Log in to your Account</h2>
                    <label> Username </label>
                        <input type='text' name='username' placeholder='Choose a username' onChange={onChange}/>
                    <label> Password </label>
                        <input type='password' name='password' placeholder='Password' onChange={onChange}/>
                    <button onClick={onSubmit}>Log In</button>
                    <p>No account yet?  Sign up for a new one <Link to='/register'>here</Link>.</p>
                    {Object.keys(errors).length > 0 && (
                        <div className="">
                            {Object.values(errors).map(value => (
                                // <Alert key={value} variant="danger">{value}</Alert>
                                <p key={value} style={{color: 'red'}}>{value}</p>
                            ))}
                        </div>
                    )}
                </FormStyle>
            </Content>
        </Wrapper>
    );
}

export default Login; 

// const LOGIN_USER = gql`
//     mutation login( $loginInput: LoginInput ) {
//         loginUser( loginInput: $loginInput ) {
//             email
//             username
//             token
//         }
//     }
// `;




