import React from 'react';
import { Wrapper, Content, LogoImg } from './navbar.styles';
import { Link } from 'react-router-dom';
import CanonLogo from '../../images/Canon_wordmark_smaller.png';

const Navbar = () => {

    return (
        <Wrapper>
            <Content>
            <Link to='/' >
               <LogoImg src={CanonLogo} />
            </Link>
            {
                //  user ? (
                //     <span className='logged-in'>Logged in as: {user.username}</span>
                // ) :
                // (
            }
            </Content>
        </Wrapper>
    )
}

export default Navbar;