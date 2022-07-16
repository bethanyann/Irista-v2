import React from 'react';
import { Link } from 'react-router-dom';
//images
import CanonLogo from '../../images/Canon_wordmark_smaller.png';
import loginIcon from '../../images/icons/login.png';
import searchIcon from '../../images/icons/search.png';
//styles
import { Wrapper, Content, LogoImg, RightNavigation, NavLinks } from './navbar.styles';


const Navbar = () => {

    return (
        <Wrapper>
            <Content>
            <Link to='/' >
               <LogoImg src={CanonLogo} /> <span style={{ fontFamily: 'Gotham', fontSize: '1.3rem', fontWeight: 420, paddingLeft: 10, color: 'black'}}> Irista </span>
            </Link>
            <RightNavigation>
                <NavLinks>
                    <span className="nav-links">
                        <Link to='/photos' className='nav-link-padding'>
                            <span className='nav-text'>Photos</span>
                        </Link>
                        <Link to='/albums' className='nav-link-padding'>
                            <span className='nav-text'>Albums</span>
                        </Link>
                        <Link to='/upload' className='nav-link-padding'>
                            <span className='nav-text'>Upload</span>
                        </Link>
                    </span>
                    <span className='nav-icons'>
                        <Link to='/search' style={{paddingRight: '10px'}}>
                            <img src={searchIcon} alt='search icon'/>
                        </Link>
                        <Link to='/login'>  
                            <img src={loginIcon} alt='login icon'/>
                        </Link>
                    </span>
                </NavLinks>
            </RightNavigation>
            
          
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