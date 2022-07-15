import styled from 'styled-components';


export const Wrapper = styled.div`
    background: white;
    padding:  0 20px;
`;


export const Content = styled.div`
    display: flex; //flex allows for the items to be placed on the left and right sides
    align-items: center;  //vertically center 
    justify-content: space-between; //this will push one item to the left and one to the right
    max-width: var(--maxWidth);
    padding: 20px 0;
    margin: 0 auto; //center the content div itself
    color: black;

    a {
        color: var(--white);
        text-decoration: none;
    }

    @media screen and (max-width: 720px){
      padding: 10px 0;   //decrease size of header on smaller screens
    }
`;

export const LogoImg = styled.img`
    width: 100px;

    //when the screen size is less than 720px
    @media screen and (max-width: 720px){
      width: 120px;   
    }
`;