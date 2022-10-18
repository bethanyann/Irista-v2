import styled from 'styled-components';

interface Props {
    image: any
}

export const Wrapper = styled.div`
    color: var(--snow);
    display:flex;
    justify-content: center;
    align-items:center;
    height: 100vh;
`;

export const Content = styled.div<Props>`
    transition: opacity .3s linear,visibility .3s linear;
    visibility: visible;
    opacity: 1;
    align-self: center;
    height: 100vh;
    background: url(${props => props.image}), var(--slate);
    background-position: center;
    top: 0;
    background-size: cover;
    flex: 1;

    .irista-text {
        font-family: 'Gotham';
        font-size: 2.3rem;
        font-weight: 420; 
        padding-left: 20px;
        color: white;
        /* position: absolute !important;
        top: 90px; */
        margin-top: 5px;

        @media screen and (max-width:1100px){
            font-size: 1.8rem;
            margin-top: 3px;;
        }
    }
`;

export const Text = styled.div`

    text-align: center;
    padding: 160px 40px;
    display: block;
    max-width: 870px;
    margin: auto;

    h1 {
        font-size: 4.3rem;
        font-weight: 700;
        line-height: 1.14;
        letter-spacing: .5px;

        @media screen and (max-width: 1100px) {
            font-size:2.1rem;
        }
    }

    h3 {
        margin: 0 auto;
        font-size: 1.3rem;
        font-weight: 400;
        line-height: 1.68;
        color: var(--snow);
        margin-top: 150px;

        @media screen and (max-width: 1100px) {
            font-size: 1.1rem;
            margin-top: 50px;
        }
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

        @media screen and (max-width:1100px){
            padding: 10px;
          
        }
    }

    button:hover {
        background-color: var(--fog);
    }

    @media screen and (max-width:1100px) {
        margin: 30% auto 42px;
    }
`;


export const Header = styled.div`
    background: ( 255,255,255,.0%);
    display: flex; //flex allows for the items to be placed on the left and right sides
    align-items: center;  //vertically center 
    justify-content: space-between; //this will push one item to the left and one to the right
    max-width: var(--maxWidthDesktop);
    padding: 10px 50px;
    margin: 0 auto; //center the content div itself
    margin-top: 30px;

    .button-1 {
        padding: 6px;
        width: 120px;
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

        @media screen and (max-width:765px) {
            padding: 6px;
            width: 120px;
            font-size: small;
        }
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

        @media screen and (max-width:765px) {
            padding: 9px;
            width: 95px;
            font-size: small;
        }
    }

    .button-2:hover{

        .button-text{
            padding-bottom: 5px;
            border-bottom: 1px solid var(--snow);
        }
        
    }

    .text {
        font-family: 'Gotham', sans-serif;
        padding-left: 20px;
        font-size: 2.5rem;
        letter-spacing: -0.5;
        color: var('--snow');
    }

    @media screen and (max-width: 968px){
        //main header mobile styles
        padding: 0px 20px;

        .text{
            padding-left: 10px;
            font-size: 1.5rem;
        }
    }


`;

export const LogoImg = styled.img`
    width: 170px;

    //when the screen size is less than 720px
    @media screen and (max-width: 1100px){
        width: 120px; 
    }
`;


