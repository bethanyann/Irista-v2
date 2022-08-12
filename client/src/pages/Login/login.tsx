import React, { useState, useContext } from 'react';
import { gql } from 'graphql-tag';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
//styles
import { Wrapper, Content, FormStyle, ImageContainer } from './login.styles';
import { Alert, Form, Input } from 'antd';
import BckImage from '../../images/login_image1_copy.jpg';
//authContext
import { AuthContext } from '../../context/authContext';
//hooks
import { useForm } from '../../hooks/useFormHook';

const LOGIN_USER = gql`
    mutation login( $loginInput: LoginInput ) {
        loginUser( loginInput: $loginInput ) {
            username
            email
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
    const [ form ] = Form.useForm();

    //call useform hook and get the form values here to be submitted in the register user mutation
    const { onChange, onSubmit, values} = useForm(loginUserCallback, initialState);

    //mutation here
    const [ loginUser, {error, loading} ] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData }}) {
            debugger;
            context.login(userData);

            //redirect to homepage after successful login
            navigate('/photos', {replace: true});
        }, 
        onError({graphQLErrors}) {
            debugger;
            if(graphQLErrors.length > 0)
            {
                //TODO - see if its a frontend or backend error as the backend errors come back differently and are messing this up
                //backend = graphQLErrors[0].message = "A user with that email already exists"
                var backendError = error?.message;
                var errors = graphQLErrors[0].extensions.errors as [];
                setErrors(errors ?? backendError);
                //console.log(errors);
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
                <div style={{display:'flex', margin:'auto',width:'38%', maxWidth:'52%', flexDirection:'row'}}>
                    <FormStyle>
                        <Form
                            form={form}
                            layout="vertical"
                            style={{textAlign:'center'}}
                        >
                            <h2 style={{marginBottom:'40px'}}> Log in to your Account</h2>
                            <div style={{display:'block', margin:'auto', width: '300px'}}>
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[{ required: true, message: '' }]}
                                >
                                    <Input type='text' name='username' placeholder='' onChange={onChange}/>
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: '' }]}
                                >
                                    <Input type='password' name='password' placeholder='' onChange={onChange}/> 
                                </Form.Item>
                            </div>
                            <button type='submit' onClick={onSubmit}>Log In</button>
                            <p>No account yet?  Sign up for a new one <Link to='/register' style={{textDecoration:'underline', color:'#CC0000'}}>here</Link>.</p>
                        </Form>
                      
                        {Object.keys(errors).length > 0 && (
                            <Alert type="error" showIcon description={
                                Object.values(errors).map(value => (
                                    value + "   "
                                ))
                            }>
                            </Alert>
                        )}
                    </FormStyle>
                    <ImageContainer src={BckImage} alt="image of person with canon camera"/>
                </div>
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




