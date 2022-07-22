import React, { useState, useContext } from 'react';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
//styles
import { Wrapper, Content, FormStyle } from './register.styles';
//authContext
import { AuthContext } from '../../context/authContext';
//hooks
import { useForm } from '../../hooks/formHook';



const REGISTER_USER = gql`
    mutation register(
        $registerInput: RegisterInput
    ) {
        registerUser(
            registerInput: $registerInput)
        {
            id 
            email
            username 
            createdAt
            token
        }
    }
`;

//set default values
const initialState = {
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const Register = ( props:any ) => {
    //gives us access to anything in our context, like the login functions 
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    //call useform hook and get the form values here to be submitted in the register user mutation
    const { onChange, onSubmit, values } = useForm(registerUserCallback, initialState);

    const [ registerUser, { error, loading } ] = useMutation(REGISTER_USER, {
        update(proxy, {data: {registerUser: userData}}) {
            // define the update function here 
            //console.log(userData);
            context.login(userData);

            //redirect to homepage after successful register and login
            navigate('/photos', {replace:true});
        }, 
        onError({ graphQLErrors }) {
            debugger;
            if(graphQLErrors.length > 0)
            {
                var errors = graphQLErrors[0].extensions.errors as [];
                setErrors(errors);
            }
        },
        variables: { registerInput : values }
    
    });

    function registerUserCallback() {
        console.log("register user callback");
        registerUser();
    }
    
    //frontend form 
    return (
        <Wrapper>
            <Content>
                <FormStyle>
                    {/* {
                        errors ? errors.map((error:any, i) => (
                            <p key={i}>{error.message}</p>
                        )) : null
                    } */}
                    <h2> Register </h2>
                    <label> Username </label>
                        <input type='text' name='username' placeholder='Choose a username'  onChange={onChange} />
                    <label> Email Address </label>
                        <input type='email' name='email' placeholder='Email Address' onChange={onChange} />
                    <label> Password </label>
                        <input type='password' name='password' placeholder='Password' onChange={onChange} />
                    <label> Confirm Password </label>
                        <input type='password' name='confirmPassword' placeholder='Confirm Password'  onChange={onChange} />

                    <button onClick={onSubmit}>Create Account</button>
                    <p>Already have an account? Sign in <Link to='/login'>here</Link>.</p>
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

export default Register;

//graphQL query: 
// const REGISTER_USER = gql`
//     mutation Mutation(
//         $registerInput: RegisterInput  
//     ) {
//         # this is calling the actual mutation here 
//         regusterUser(
//             # takes in the variable we passed in above: 
//             registerInput: $registerInput
//         )
//         {
//             # returns this data: 
//             id
//             email
//             username
//             createdAt
//             token
//         }
//     }
// `;




