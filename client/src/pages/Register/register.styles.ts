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
    justify-content: center;
    /* align-content: center; */
    height: 95vh;

    background-color: var(--fog);

    /* -webkit-scrollbar {
        display:none;
    } */
`;

export const FormStyle = styled.div`
    display: flex;
    align-items: center;

    flex: 1;
    background-color: var(--snow);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 30px 70px 25px 70px;

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

    .ant-form-vertical .ant-form-item .ant-form-item-control {
        height: 34px !important;
    }

    input:focus{
        border: 1px solid var(--silver); //#b5b3b3 
    }

    label {
        font-size: medium;
        margin: 10px 0 4px 25px;
    }
`;

export const ImageContainer = styled.div`
    width: 80%;
    max-width: 600px;
    min-width: 350px;

    img {
        flex: 2;
        object-fit: cover;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        width: 100%;
        min-height: 700px;
    }

    @media screen and (max-width: 950px){
        display: none;
    }
`;