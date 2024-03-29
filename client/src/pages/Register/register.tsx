import React, { useState, useContext } from 'react';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
//styles
import { Wrapper, Content, FormStyle, ImageContainer } from './register.styles';
import { Button, Form, Input } from 'antd';
import LoginImage from '../../images/login_image2_copy.jpg';
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

interface ErrorInterface {
    [error : string] : string
}

const Register = ( props:any ) => {
    //gives us access to anything in our context, like the login functions 
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState<ErrorInterface>({});

    //call useform hook and get the form values here to be submitted in the register user mutation
    const { onChange, onSubmit, values } = useForm(registerUserCallback, initialState);

    const [ registerUser, { error, loading } ] = useMutation(REGISTER_USER, {
        update(proxy, {data: {registerUser: userData}}) {
            // define the update function here 
            context.login(userData);

            navigate(`/photos`, {replace: true});
        }, 
        onError({ graphQLErrors }) {
            if(graphQLErrors.length > 0)
            {
                var errors = graphQLErrors[0].extensions.errors as ErrorInterface;
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
                <div style={{display:'flex', margin:'auto', flexDirection:'row', marginLeft:"30px", marginRight:"30px"}}>
                <FormStyle>
                   
                   <Form
                       layout="vertical"
                       style={{textAlign:'center'}}
                   >
                        <h2 style={{marginBottom:'40px'}}>Register your Account</h2>
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
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input type='email' name='email' placeholder='' onChange={onChange} />
                            </Form.Item>
                            <div className="error-wrap">
                                <p className='p-error'>
                                    { ('email' in errors) ?  errors['email'] : '' }
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
                                    { ('password' in errors) ?  errors['password'] : '' }
                                </p>
                            </div>
                            <Form.Item
                                label="Confirm Password"
                                name="confirmPassword"
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input type='password' name='confirmPassword' placeholder='' onChange={onChange}/> 
                            </Form.Item>
                            <div className="error-wrap">
                                <p className='p-error'>
                                { ('confirmPassword' in errors) ?  errors['confirmPassword'] : '' }
                                </p>
                                <p className='p-error'>
                                    { ('all' in errors) ?  errors['all'] : '' }
                                </p>
                            </div>
                       </div>
                       <Button className="accept-button" onClick={onSubmit} style={{width:'300px', margin:0, marginTop:'20px' }} loading={loading}>Register</Button>
                       <p style={{marginTop:'50px', paddingLeft:'17px', paddingRight:'16px'}}>Already have an account? Sign in <Link to='/login' style={{textDecoration:'underline', color:'#CC0000'}}>here</Link>.</p>
                   </Form>
               </FormStyle>
                {/* <FormStyle>
                    <Form
                        layout="vertical"
                        style={{textAlign:'center'}}
                    >
                        <h2 style={{marginBottom:'15px'}}>Register</h2>
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
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input type='email' name='email' placeholder='' onChange={onChange} />
                            </Form.Item>
                            <div className="error-wrap">
                                <p className='p-error'>
                                    { ('email' in errors) ?  errors['email'] : '' }
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
                                    { ('password' in errors) ?  errors['password'] : '' }
                                </p>
                            </div>
                            <Form.Item
                                label="Confirm Password"
                                name="confirmPassword"
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input type='password' name='confirmPassword' placeholder='' onChange={onChange}/> 
                            </Form.Item>
                            <div className="error-wrap">
                                <p className='p-error'>
                                { ('confirmPassword' in errors) ?  errors['confirmPassword'] : '' }
                                </p>
                                <p className='p-error'>
                                    { ('all' in errors) ?  errors['all'] : '' }
                                </p>
                            </div>
                        </div>
                        <Button className="accept-button" onClick={onSubmit} loading={loading}>Create Account</Button>
                        <p style={{marginTop:'50px', paddingLeft:'10px'}}>Already have an account? Sign in <Link to='/login' style={{textDecoration:'underline', color:'#CC0000'}}>here</Link>.</p>
                    </Form>
                </FormStyle> */}
                <ImageContainer>
                        <img src={LoginImage} alt="person with canon camera" />
                </ImageContainer>
                </div>
            </Content>
        </Wrapper>
    );
}

export default Register;




