import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: var(--maxWidth);
    //max-width: 2000px;
    margin: 0 auto;
    padding: 0 20px;
`;

export const Content = styled.div`
    //center on the page
    display: flex;
    justify-content: center;
    align-content: center;

    background-color: var(--silver);
`;

export const FormStyle = styled.div`
    //background-color: #f07122;
    display: grid;
    background-color: var(--snow);
    position: absolute;
    align-items: center;
    justify-content: center;
    //text-align: center;
    border-radius: 5px;
    //height: 300px; // take off once i have data in here 
    top:40%;
    left:50%;
    width:20%;//change accordingly or even not necessary to define
    height:30%;//change accordingly or even not necessary to define
    //margin-top: 50px;
    transform:translate(-50%,-50%);
    -moz-transform:translate(-50%,-50%);
    -ms-transform:translate(-50%,-50%);
    -webkit-transform:translate(-50%,-50%);
    -o-transform:translate(-50%,-50%);
    border-radius: 5px;
    margin-bottom: 50px;
    //overflow: auto;
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
