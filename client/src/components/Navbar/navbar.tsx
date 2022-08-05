import { useContext, useState }from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Tooltip, Button, Avatar } from 'antd';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
//context
import { AuthContext } from '../../context/authContext';
//types
import { User } from '../../models/types';
//images
import CanonLogo from '../../images/Canon_wordmark_smaller.png';
//styles
import { Wrapper, Content, LogoImg, NavLinks } from './navbar.styles';


const Navbar = () => {
    let navigate = useNavigate();
    //can pull the user and the logout function from the context
    const { user, logout } = useContext(AuthContext);
    const isUserLoggedOut = isEmpty(user);

    const [ isSearching, setIsSearching ] = useState(false);

    const onLogout = () => {
        logout();
        navigate('/', {replace: true});
    }
    
    const handleSearch = () => {
        setIsSearching(true);
    }
    return (
        <Wrapper>
            <Content>          
                <Link to={isUserLoggedOut ? '/' : '/photos'} >
                    <LogoImg src={CanonLogo} /> <span className="irista-text"> Irista </span>
                </Link>
                <div>
                <NavLinks>
                    { !isUserLoggedOut ?  
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
                                <Tooltip title="search">
                                    <div className="search-box">
                                        <input type="text" className="search-txt" name="" placeholder="search for photo name, caption, or tag" />
                                        <button className="search-button" onClick={handleSearch}><SearchOutlined style={{fontSize:'1.3em'}}/></button>
                                    </div>
                                </Tooltip>
                         
                                <button className="user-button"><UserOutlined style={{fontSize:'1.3em'}}/></button>
                            
                        </span>  
                    </NavLinks>
                    </div>
                </Content>
            </Wrapper>                           
        )
    
}

export default Navbar;