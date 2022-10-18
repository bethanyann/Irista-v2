import React, { useState, useContext } from 'react';
import { gql } from 'graphql-tag';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
//styles
import { Wrapper, Content, FormStyle, ImageContainer } from './login.styles';
import { Form, Input, Button } from 'antd';
import LoginImage from '../../images/photo-camera-girl-logo.jpg';
//authContext
import { AuthContext } from '../../context/authContext';
//hooks
import { useForm } from '../../hooks/useFormHook';

const LOGIN_USER = gql`
    mutation login( $loginInput: LoginInput ) {
        loginUser( loginInput: $loginInput ) {
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

interface ErrorInterface {
    [error: string] : string
}

const Login = ( props:any ) => {
    //gives us access to anything in our context, like the login functions 
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState<ErrorInterface>({});
    const [ form ] = Form.useForm();

    //call useform hook and get the form values here to be submitted in the register user mutation
    const { onChange, onSubmit, values} = useForm(loginUserCallback, initialState);

    //mutation here
    const [ loginUser, {error, loading} ] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData }}) {
            context.login(userData);
            navigate(`/photos`, {replace: true});
        }, 
        onError({graphQLErrors}) {
            if(graphQLErrors.length > 0)
            {
                var errors = graphQLErrors[0].extensions.errors as ErrorInterface;
                setErrors(errors);
            }
        },
        variables: { loginInput: values }
    })

    //very helpful if you remember to call the mutation :|
    function loginUserCallback() {
        console.log("login user callback");
        loginUser();
    }
  
    //frontend form 
    return (
        <Wrapper>
            <Content>
                <div style={{display:'flex', margin:'auto', flexDirection:'row'}}>
           
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
                                <div className="error-wrap">
                                    <p className='p-error'>
                                        { ('username' in errors) ?  errors['username'] : '' }
                                    </p>
                                </div>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: '' }]}
                                   
                                >
                                    <Input type='password' name='password' placeholder='' onChange={onChange}/>
                                </Form.Item>
                                <div className="error-wrap">
                                        <p className='p-error'>
                                            {
                                                ('password' in errors) ?  errors['password'] : ''
                                            }
                                        </p>
                                        <p className='p-error'>
                                            {
                                                ('all' in errors) ?  errors['all'] : ''
                                            }
                                        </p>
                                </div>
                            </div>
                            <Button className="accept-button" onClick={onSubmit} style={{width:'300px', margin:0, marginTop:'20px' }} loading={loading}>Log In</Button>
                            <p className='p-link'>No account yet?  Sign up for a new one <Link to='/register' style={{textDecoration:'underline', color:'#CC0000'}}>here</Link>.</p>
                        </Form>
                    </FormStyle>
                    <ImageContainer>
                        <img src={LoginImage} alt="person with canon camera" />
                    </ImageContainer>
                </div>
            </Content>
        </Wrapper>
    );
}

export default Login; 





