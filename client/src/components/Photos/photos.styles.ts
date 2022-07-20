import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: var(--maxWidthDesktop);  //control the width of the grid only displaying 5 in a row, maybe play with this if I decide to go full-screen with it
    margin: 0 auto;
    padding: 50px 20px 20px 20px;
    width: 50%;
    min-width: 800px; 

    .button-container{
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }

    button {
        display:inline-block;
        padding: 12px;
        color: white;
        /* background-color: var(--red); */
        border: none;
        font-size: medium;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .cancel-button {
        background-color: var(--smoke);
        color: var(--snow);
        margin-right: 20px;
    }

    .cancel-button:hover {
        background-color: var(--slate);
    }

    .accept-button {
        background-color: var(--darkRed);
        color: var(--snow);
    }

    .accept-button:hover {
        background-color: var(--red);
    }

    .thumb-wrapper{
        padding: 10px 0 5px 10px;
        min-height: 40px;
        border: 1px solid var(--fog);
    }
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: var(--fog);
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;

    h2 {
        margin-top: 66px;
    }
`;

export const UploadImage = styled.img`
    width: 150px;
    padding: 40px 0 60px 0;

`;


export const ThumbsContainer = styled.aside`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    //margin-top: 16px;

    h4{
        margin: 0;
        margin-top: 10px;
    }
    .thumb {
        display: inline-flex;
        border-radius: 2px;
        border: 1px solid #eaeaea;
        margin-bottom: 8px;
        margin-right: 8px;
        width: 100px;
        height: 100px;
        padding: 4px;
        box-sizing: border-box;
    }

    .thumb-inner {
        display: flex;
        min-width: 0;
        overflow: hidden;
        justify-content: center;
    }

    .thumb-image {
        display: block;
        width: auto;
        height: 100%;
    }
`;

