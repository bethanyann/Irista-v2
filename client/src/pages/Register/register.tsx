import React, { useState, useContext } from 'react';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
//styles
import { Wrapper, Content, FormStyle, ImageContainer } from './register.styles';
import { Alert, Form, Input } from 'antd';
import BckImage from '../../images/login_image2.jpg';
//authContext
import { AuthContext } from '../../context/authContext';
//hooks
import { useForm } from '../../hooks/useFormHook';



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

            if(graphQLErrors.length > 0)
            {
                var errors = graphQLErrors[0].extensions.errors as [];
                setErrors(errors);
            }
        },
        variables: { registerInput : values }
    
    });

    function registerUserCallback() {
        //console.log("register user callback");
        registerUser();
    }
    
    //frontend form 
    return (
        <Wrapper>
            <Content>
                <div style={{display:'flex', margin:'auto', flexDirection:'row'}}>
                <FormStyle>
                    <Form
                        layout="vertical"
                        style={{textAlign:'center'}}
                    >
                        <h2 style={{marginBottom:'15px'}}>Register</h2>
                        <div style={{display:'block', margin:'auto', width: '350px'}}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input type='text' name='username' placeholder='' onChange={onChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input type='email' name='email' placeholder='' onChange={onChange} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input type='password' name='password' placeholder='' onChange={onChange}/> 
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input type='password' name='confirmPassword' placeholder='' onChange={onChange}/> 
                        </Form.Item>
                        </div>
                        <button onClick={onSubmit}>Create Account</button>
                        <p>Already have an account? Sign in <Link to='/login' style={{textDecoration:'underline', color:'#CC0000'}}>here</Link>.</p>
                        <div style={{width:'400px'}}>
                            {Object.keys(errors).length > 0 && (
                                <Alert type="error" showIcon description={
                                    Object.values(errors).map(value => (
                                        value + "   "
                                    ))
                                }>
                                </Alert>
                            )}
                        </div>
                    </Form>
                </FormStyle>
                <ImageContainer src={BckImage} alt="image of person with canon camera"/>
                </div>
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




