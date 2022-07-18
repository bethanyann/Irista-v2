import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//context
import { AuthContext } from '../../context/authContext';
import { User } from '../../models/types';
//styles
import { Wrapper, Content, Text, Header, LogoImg } from './landing.styles';

import CanonLogo from '../../images/Canon_wordmark_white.png';


const Landing = () => {
    let navigate = useNavigate();

    const { user, login } = useContext(AuthContext);
    //cast user to User type until I can get context switched over to ts file
    const loggedInUser: User | null = user ? user : null;
    console.log(loggedInUser);

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
                            <LogoImg src={CanonLogo} /> <span style={{ fontFamily: 'Gotham', fontSize: '2.5rem', paddingLeft: 20, letterSpacing: -0.5, color: 'whitesmoke'}}> Irista </span>
                        </div>
                        <div className='button-div'>
                            <button className='button-2' onClick={redirectToLogin}><span className='button-text'>Sign In</span></button>
                            <button className='button-1' onClick={redirectToRegister}>Sign Up</button> 
                        </div>
                       
                    </Header>
                    <Text>
                        <h1>Bring your Images together, effortlessly</h1>
                        <h3>Manage, share, and print your collection of photos and videos with cloud storage, without compromising on quality.</h3>
                        <button onClick={redirectToRegister}> Start with 15GB Free</button>
                    </Text>
                </Content>
           
        </Wrapper>  
    );
}

export default Landing;


