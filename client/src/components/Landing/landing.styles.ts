import styled from 'styled-components';


export const Wrapper = styled.div`
    color: var(--snow);
    display:flex;
    justify-content: center;
    align-items:center;


`;

export const Content = styled.div`
    transition: opacity .3s linear,visibility .3s linear;
    visibility: visible;
    opacity: 1;
    align-self: center;

    background: url("https://web.archive.org/web/20190417224026/https://d2gbfimz0vwl0i.cloudfront.net/assets/images/homepage/hero/1.4-Hero-Image.jpg") no-repeat center center fixed;
    //background: url("https://web.archive.org/web/20190417150753im_/https://d2gbfimz0vwl0i.cloudfront.net/assets/images/homepage/9-Start-Free.0402f1c73618b798.jpg") no-repeat center center fixed;
    height: 100%;
    max-height: 1300px;
    min-height: 1270px;
    top: 0;
    background-size: cover;
    flex: 1;
`;

export const Text = styled.div`

    text-align: center;
    padding: 0 40px;
    display: block;
    max-width: 870px;
    margin: 15% auto 42px;

    h1 {
        font-size: 4.3rem;
        font-weight: 700;
        line-height: 1.14;
        letter-spacing: .5px;
    }

    h3 {
        margin: 0 auto;
        font-size: 1.3rem;
        font-weight: 400;
        line-height: 1.68;
    }

    button {
        display: block;
        padding: 16px;
        font-weight: 500;
        width: 300px;
        margin: auto;
        margin-top: 70px;
        margin-bottom: 50px;
        color: var(--slate);
        background-color: var(--snow);
        border: none;
        font-size: medium;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
`;


export const Header = styled.div`
    background: ( 255,255,255,.0%);
    display: flex; //flex allows for the items to be placed on the left and right sides
    align-items: center;  //vertically center 
    justify-content: space-between; //this will push one item to the left and one to the right
    max-width: var(--maxWidthDesktop);
    padding: 10px 0;
    margin: 0 auto; //center the content div itself
    margin-top: 50px;

    .button-1 {
        padding: 12px;
        width: 150px;
        margin: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        color: white;
        font-size: medium;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
        background: transparent;
        border: 1px solid var(--snow);
    }

    .button-1:hover{
        background: rgb(255,255,255, 25%);
        border: 1px solid rgb(255,255,255, 5%);
    }

    .button-2 {
        padding: 12px;
        width: 150px;
        margin: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        font-size: medium;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: none;
        background: transparent;
        color: var(--snow);
    }

    .button-2:hover{

        .button-text{
            padding-bottom: 5px;
            border-bottom: 1px solid var(--snow);
        }
        
    }


`;

export const LogoImg = styled.img`
    width: 170px;

    .text {
        font-family: 'Gotham', sans-serif;
        padding-left: 20px;
        font-size: 500;
    }

    //when the screen size is less than 720px
    @media screen and (max-width: 720px){
        width: 120px;   
    }
`;


