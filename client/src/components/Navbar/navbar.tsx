import { useContext }from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
//context
import { AuthContext } from '../../context/authContext';
//types
import { User } from '../../models/types';
//images
import CanonLogo from '../../images/Canon_wordmark_smaller.png';
import loginIcon from '../../images/icons/login.png';
import logoutIcon from '../../images/icons/logout.png';
import searchIcon from '../../images/icons/search.png';
//styles
import { Wrapper, Content, LogoImg, RightNavigation, NavLinks } from './navbar.styles';


const Navbar = () => {
    let navigate = useNavigate();
    //can pull the user and the logout function from the context
    const { user, logout } = useContext(AuthContext);
    const isUserLoggedOut = isEmpty(user);

    const onLogout = () => {
        logout();
        navigate('/', {replace: true});
    }
    
    return (
        <Wrapper>
            <Content>          
                <Link to={isUserLoggedOut ? '/' : '/dashboard'} >
                    <LogoImg src={CanonLogo} /> <span style={{ fontFamily: 'Gotham', fontSize: '1.3rem', fontWeight: 420, paddingLeft: 10, color: 'black'}}> Irista </span>
                </Link>
                <RightNavigation>
                    <NavLinks>
                        {!isUserLoggedOut ?  
                            <span className="nav-links">
                                <NavLink to='/photos' className='nav-link'>
                                    Photos
                                </NavLink>
                                <span style={{paddingLeft:'25px'}}></span>
                                <NavLink to='/albums' className='nav-link'>
                                    Albums
                                </NavLink>
                                <span style={{paddingLeft:'25px'}}></span>
                                <NavLink to='/upload' className='nav-link'>
                                    Upload
                                </NavLink>
                                <span style={{paddingRight:'10px'}}></span>
                            </span>
                        : null } 
                            <span className='nav-icons'>
                                <Link to='/search' style={{paddingRight: '10px'}}>
                                    <img src={searchIcon} alt='search icon'/>
                                </Link>
                                {
                                    isUserLoggedOut  ? 
                                    <Link to='/login'>  
                                        <img src={loginIcon} alt='login icon'/>
                                    </Link> :
                                    <Link to="#">  
                                        <img src={logoutIcon} alt='log out icon' onClick={onLogout} />
                                    </Link>
                                }
                            </span>  
                        </NavLinks>
                    </RightNavigation>
                </Content>
            </Wrapper>                           
        )
    
}

export default Navbar;