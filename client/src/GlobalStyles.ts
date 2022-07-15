import { createGlobalStyle } from 'styled-components';

//css variables are denoted with --
export const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --white: #ffffff;
        --lightGray: #eeeeee;
        --medGray: #353535;
        --darkGray: #1c1c1c;
        --lightBlue: #01b4e4;
        --lightGreen: #90cea1;
        --fontBiggest: 3rem;
        --fontBigger: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
    }

    //resetting some stuff - targets whole application styles
    * {
        box-sizing: border-box;
        font-family: 'Abel', sans-serif;
    }

    body {
        margin: 0;
        padding: 0;

        //can nest things like this in styled-componenets
        h1 {
            font-size: 2rem;
            font-weight: 600;
            color: var(--white);
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }

        p {
            font-size: 1rem;
            color: var(--white);
        }

    }

`