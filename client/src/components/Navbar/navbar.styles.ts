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
        top: 15px;
    }
  
    @media screen and (max-width: 720px){
      padding: 10px 0;   //decrease size of header on smaller screens
    }


`;

export const LogoImg = styled.img`
    width: 100px;
    .text {
        font-family: 'Gotham', sans-serif;
       // color: black;
        padding-left: 20px;
        font-size: 500;
    }
    //when the screen size is less than 720px
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
    }
    .nav-link:hover {
        color: var(--slate);
        border-bottom: 2px solid var(--darkRed);
        padding-bottom: 16px;
    }
    .active {
        color: var(--slate);
        border-bottom: 3px solid var(--darkRed);
        padding-bottom: 16px;
        font-weight: 410;
    }
    /* login and search icons section*/
    .nav-icons {
        border-left: 2px solid var(--fog);
        padding-left: 20px; 
        display:flex;
    }
      
    img {
        width: 35px;
        @media screen and (max-width: 720px) {
            width: 40px;
        }
    }
`;