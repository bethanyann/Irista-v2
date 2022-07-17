import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
//styles
import { Wrapper, Content, FormStyle } from './register.styles';
//authContext
import { AuthContext } from '../../context/authContext';
//hooks
import { useForm } from '../../utilities/formHook';


function Register(props:any) {
    //gives us access to anything in our context, like the login functions 
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    //set default values
    const initialState = {
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    }

    //extract values and methods from the useform hook
    //give it the addUser function as the callback
    //the problem with having this declaration here is we are trying to use addUser before its declared. 
    const { onChange, onSubmit, values} = useForm(registerUserCallback, initialState);

    //set up the full register user mutation
    // const [ registerUser, { loading }] = useMutation(REGISTER_USER, {
    //     //this will be triggered if the mutation is successfully executed
    //     update(proxy, {data: { registerUser: userData }}) {
    //         //define the update function here 
    //         console.log(userData);
    //         //context.login(userData);

    //         //redirect to homepage after successful register and login
    //         navigate('/', {replace:true});
    //     }, 
    //     onError(err:any) {
    //         if(err.graphQLErrors.length > 0) {
    //             setErrors(err.graphQLErrors[0].extensions.errors);
    //         }
    //     },
    //     //attach the user input values here
    //    // variables: { registerInput : values}
    // }); 

    //because functions in javascript are hoisted, this function declaration is the workaround for the weirdness of the "using before its defined" issues with values and addUser
    function registerUserCallback() {
       // registerUser();
    }

    //frontend form 

    return (
        <Wrapper>
            <Content>
                <FormStyle>
                    <h2> Register </h2>
                    <input type='text' placeholder='Choose a username'/>
                    <input type='email' placeholder='Email Address'/>
                    <input type='password' placeholder='Password'/>
                    <input type='password' placeholder='Confirm Password' />

                    <button>Create Account</button>
                </FormStyle>
            </Content>
        </Wrapper>
    );
}

//graphQL query: 

const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput  
    ) {
        # this is calling the actual mutation here 
        regusterUser(
            # takes in the variable we passed in above: 
            registerInput: $registerInput
        )
        {
            # returns this data: 
            id
            email
            username
            createdAt
            token
        }
    }
`;


export default Register;