import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: var(--maxWidth);
    //max-width: 2000px;
    margin: 0 auto;
    padding: 0;
`;

export const Content = styled.div`
    //center on the page
    display: flex;
    /* flex-direction: row; */
    justify-content: center;
    /* align-content: center; */
    height: 95vh;

    background-color: var(--fog);

    -webkit-scrollbar {
        display:none;
    }
`;

export const FormStyle = styled.div`
    //background-color: #f07122;
    flex: 1;
    background-color: var(--snow);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    /* margin:auto; */
    padding: 10px 45px 25px 45px;

    p {
        word-wrap: none;
        margin-bottom: 0;
        margin-top: 50px;
    }

    h2 {
        text-align: center;
        padding-top: 20px;
    }

    .formCheckbox {
        padding-top: 10px; 
        margin-left: 5px;
    }

    .form-label {
        margin-bottom: 0;
        margin-top: .5rem;
        font-weight: 100;
    }

    button {
        display: block;
        padding: 12px;
        width: 300px;
        margin: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        color: white;
        background-color: var(--red);
        border: none;
        font-size: medium;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .button:hover {
        color: var(--slate);
        background-color: var(--lightRed);
    }

    input:focus{
        border: 1px solid var(--silver); //#b5b3b3 
    }

    label {
        font-size: medium;
        margin: 10px 0 4px 25px;

        /* @media screen and (max-width: 700px){
            margin: 10px 0 4px 0;
        } */
    }
`;

export const ImageContainer = styled.img`
    flex: 2;
    object-fit: cover;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;