import { createGlobalStyle } from 'styled-components';

//css variables are denoted with --
export const GlobalStyle = createGlobalStyle`

    :root {
        --maxWidthDesktop: 1920px;
        --maxWidthLaptop: 1280px;
        --maxWidthMobile: 768px;

        //grays
        --black: #141228;
        --slate: #4B4F60;
        --steel: #848c9e;
        --silver: #b7bed0;
        --smoke: #d4d9e8;
        --fog: #e8e8f6;
        --steam: #f3f4fa;
        --snow: #fcfdff;
        //reds
        --darkRed: #CC0000;
        --red: #FF4B44;
        --lightRed: #ffa098;
        //greens
        --darkTeal: #21b58e;
        --teal: #26cfa2;
        --lightTeal: #70debf;
        //yellows
        --darkMarigold: #f89c0f;
        --marigold: #ffaa1d;
        --lightMarigold: #ffbe46;
        //blues
        --darkBlue: #002dab;
        --blue: #002dab;
        --lightBlue: #265ef8;
        //fontsizes
        --fontBiggest: 3rem;
        --fontBigger: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmedium: 1.1rem;
        --fontSmall: 1rem;
    }

    //resetting some stuff - targets whole application styles
    * {
        box-sizing: border-box;
        font-family: 'Gotham', sans-serif;
        color: var(--medGray2);
    }

    body {
        margin: 0;
        padding: 0;

        //can nest things like this in styled-componenets
        h1 {
            font-size: 2rem;
            font-weight: 600;
            color: var(--darkGray);
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }

        p {
            font-size: 1rem;
            color: var(--darkGray);
        }

        input {
            padding: 0 11px;
            height: 35px;
            border-radius: 4px;
            border: 1px solid var(--silver); //#b5b3b3
            font-size: medium;
            color: var(--slate); //#545454
            width: 300px;
            margin: auto;
            //margin: 10px 10px;
        }

        textarea:focus, input:focus{
            outline: none;
        }
    }

`