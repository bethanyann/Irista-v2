import styled from 'styled-components';


export const Wrapper = styled.div`
    background: var(--snow);
    padding:  0 20px;
    font-family: 'Gotham', sans-serif;
`;


export const Content = styled.div`
    display: flex; //flex allows for the items to be placed on the left and right sides
    align-items: center;  //vertically center 
    justify-content: space-between; //this will push one item to the left and one to the right
    max-width: var(--maxWidthDesktop);
    padding: 10px 0;
    margin: 0 auto; //center the content div itself
    color: black;

    a {
        text-decoration: none;
    }

    .irista-text {
        font-family: 'Gotham';
        font-size: 1.3rem;
        font-weight: 420; 
        padding-left: 10px;
        color: black;
        position: absolute !important;
        top: 16px;
    }
  
    @media screen and (max-width: 720px){
      padding: 10px 0;   //decrease size of header on smaller screens
    }


`;

export const LogoImg = styled.img`
    width: 100px;
    
    .text {
        font-family: 'Gotham', sans-serif;
        padding-left: 20px;
        font-size: 500;
    }

    @media screen and (max-width: 720px){
      width: 120px;   
    }
`;

export const NavLinks = styled.div`
    display: flex;
    align-items: center;

    /* menu links section */
    .nav-links {
        padding: 0 15px;
    }

    .nav-link {
        font-size: var(--fontSmedium);
        font-weight: 400;
        margin-right: 15px;
    }

    .nav-link:hover {
        color: var(--slate);
        border-bottom: 2px solid var(--darkRed);
        padding-bottom: 19px;
    }

    .active {
        color: var(--slate);
        border-bottom: 4px solid var(--darkRed);
        padding-bottom: 18px;
        font-weight: 410;
    }

    .divider {
        padding-left: '25px';
    }
  
`;

export const NavIcons = styled.div`
    display:flex;
    height: 40px;
    color: black;

    .divider {
        border: 1px solid var(--fog);
        margin-right: 15px;
    }

    .search-box {
        display:flex;
    }

    .search-box-active {
        display: flex;
    }

    .search-button {
        color: black;
        text-align: center;
        border-radius: 50%;
        background: none;
        border: 1px solid black;
        padding: 8px 9px;
        margin-right: 15px;
        height: 37px;
        transition-delay: 0.36s;
    }

    .search-button-active {
        border: none;
        background:none;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
        border-right: 1px solid black;
        border-top-left-radius: 0%;
        border-bottom-left-radius: 0%;
        padding: 9px;
        margin-right: 15px;
        height: 37px;
        transition: 0.15s;
    }

    .search-button:hover {
        cursor: pointer;
        border: 1px solid #CC0000;
        color: #CC0000;
        transition-delay: color 0s;
    }

    .search-text {
        border: none;
        border: 1px solid white;
        background: none;
        outline: none;
        padding: 0;
        transition: 0.5s;
        width: 0px;
        border-right: none;
        border-radius: 20px;
        border-top-right-radius: 0%;
        border-bottom-right-radius: 0%;

        transition: width 0.4s ease-out, border-color 0.4s ease 0.1s;
    }

    .search-text:focus {
        border-color: none;
    }

    .search-text-active {
        width: 338px;
        padding: 2px 6px 0px 11px;
        border: 1px solid black;
        border-radius: 20px;
        height: 40px;
        border-top-right-radius: 0%;
        border-bottom-right-radius: 0%;
        border-right: none;
        transition: .4s;
    }

    .user-button {
        color: black;
        text-align: center;
        border-radius: 50%;
        background: none;
        border: 1px solid black;
        padding: 8px 9px;
        margin-right: 10px;
        height: 37px;
        transition: 0.5s;
    }

    .user-button:hover {
        border: 1px solid #CC0000;
        color: #CC0000;
        cursor: pointer;
    }
`;