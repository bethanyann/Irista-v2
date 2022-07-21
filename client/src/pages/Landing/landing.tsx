import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
//context
import { AuthContext } from '../../context/authContext';
import { User } from '../../models/types';
//styles
import { Wrapper, Content, Text, Header, LogoImg } from './landing.styles';

import CanonLogo from '../../images/Canon_wordmark_white.png';


const Landing = () => {
    let navigate = useNavigate();

    const { user } = useContext(AuthContext);

    //if a logged in user tries to view the landing page, redirect to dashboard
    if(!isEmpty(user)){
        navigate('/dashboard');
    }

    const redirectToRegister = () => {
        navigate('/register', {replace: true});
    }

    const redirectToLogin = () => {
        navigate('/login', {replace: true});
    }

    return (
        <Wrapper className='home-slide'>
                <Content>
                    <Header>
                        <div>
                            <LogoImg src={CanonLogo} /> <span className='text'> Irista </span>
                        </div>
                        <div className='button-div'>
                            <button className='button-2' onClick={redirectToLogin}><span className='button-text'>Sign In</span></button>
                            <button className='button-1' onClick={redirectToRegister}>Sign Up</button> 
                        </div>
                       
                    </Header>
                    <Text>
                        <h1>Bring your images together, effortlessly.</h1>
                        <h3>Manage, share, and print your collection of photos and videos with cloud storage, without compromising on quality.</h3>
                        <button onClick={redirectToRegister}> Start with 15GB Free</button>
                    </Text>
                </Content>
           
        </Wrapper>  
    );
}

export default Landing;


