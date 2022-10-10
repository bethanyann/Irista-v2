import { useContext, useState, useEffect, useRef }from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Input, InputRef, Dropdown, Menu } from 'antd';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

//context
import { AuthContext } from '../../context/authContext';
//images
import CanonLogo from '../../images/Canon_wordmark_smaller.png';
//styles
import { Wrapper, Content, LogoImg, NavLinks, NavIcons } from './navbar.styles';

const Navbar = () => {
    let navigate = useNavigate();

    //can pull the user and the logout function from the context
    const { user, logout } = useContext(AuthContext);
    const isUserLoggedOut = isEmpty(user);

    const inputRef = useRef<InputRef>(null);
    const [ isSearching, setIsSearching ] = useState(false);
    const [ inputValue, setInputValue ] = useState('');
    
    useEffect(() => {
        if (isSearching) {
          inputRef.current?.focus();
        }
      }, [isSearching]);

    const handleLogout = (e : any) => {
        e.preventDefault();
        logout();
        navigate('/', {replace: true});
    }

    const showSearchInput = () => {
        setIsSearching(!isSearching);
        setInputValue('');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputSubmit = () => {
        if(inputValue !== "") {
            navigate(`/search/${inputValue}`, {replace: true});
        }
    }

    const menu =(
        <Menu style={{textAlign:'center'}}
            items={[
                {
                    key:'1',
                    label: (
                       <p style={{marginBottom: 0, width: '100px'}} onClick={(e) => handleLogout(e)}>{isUserLoggedOut ? "Log In" : "   Log out   "}</p>
                    )
                }
            ]}
        >
        </Menu>
    )

    return (
        <Wrapper>
            <Content>          
                <Link to={isUserLoggedOut ? '/' : '/photos'} >
                    <LogoImg src={CanonLogo} /> <span className="irista-text"> Irista </span>
                </Link>
                <div>
                    <NavLinks>
                        <span className="nav-links" onClick={() => setIsSearching(false)}>
                        { !isUserLoggedOut ? 
                            <>
                                <NavLink to='/photos' className='nav-link'>
                                    Photos
                                </NavLink>
                                    <span  className="divider"></span>
                                <NavLink to='/albums' className='nav-link'>
                                    Albums
                                </NavLink>
                                    <span className="divider"></span>
                                <NavLink to='/upload' className='nav-link'>
                                    Upload
                                </NavLink>
                            </>            
                        : null}
                        </span>
                        <NavIcons>
                        { !isUserLoggedOut ? 
                            <>
                                <div className='divider'></div>
                                <div className={isSearching ? "search-box-active" : "search-box"}>
                                    <Input ref={inputRef} type="text" 
                                        prefix={<CloseOutlined hidden={!isSearching} onClick={() => setIsSearching(false)}/>} 
                                        className={isSearching ? "search-text-active" : "search-text"} 
                                        style={{backgroundColor: '#fcfdff', paddingTop: 0, height:'37px'}} 
                                        placeholder="Photo name, caption, or tag"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onPressEnter={handleInputSubmit}
                                    />
                                    <button className={isSearching ? "search-button-active" : "search-button"} onClick={showSearchInput}>
                                        <SearchOutlined style={{fontSize:'1.3em'}}/>
                                    </button>
                                </div>
                                <Dropdown overlay={menu} trigger={['click']} arrow>
                                    <button className="user-button" onClick={(e) => e.preventDefault()}><UserOutlined style={{fontSize:'1.3em'}}/></button>
                                </Dropdown>    
                            </>
                        : null }
                        </NavIcons>
                    </NavLinks>
                </div>
            </Content>
        </Wrapper>                           
    )
}

export default Navbar;