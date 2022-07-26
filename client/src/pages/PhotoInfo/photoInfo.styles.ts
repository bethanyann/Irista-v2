import styled from 'styled-components';

export const Content = styled.div`

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;

    .photo-horizontal {
        width: 70%;
        margin-top: 25vh;
    }

    .photo-vertical {
        /* width: 70%; */
        height: 100%;
        margin: auto;
    }

    .img-horizontal {
        width: 100%
    }

    .img-vertical {
        height: 100%;
    }
`; 

export const Metadata = styled.div`
    width: 400px;
    margin-left: 20px;
    padding: 10px;
    
    color: var(--snow);

    h2 {
        color: var(--snow);
        margin-bottom: 20px;
    }

    h4 {
        color: var(--snow);
    }

    p {
        margin-bottom: 0px;
    }

    .smaller-font {
        font-size: small;
        //text-transform: uppercase;
        margin-top: 10px;
        color: #999999;
    }

    .divider {
        border-bottom: 1px solid var(--steam);
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .three-column{
        display: flex;
        justify-content: space-between;
    }

    .two-column{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }
    
    .first-column, .second-column {
        width: 50%;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .icon {
        width: 30px;
        float: left;
        margin-right: 10px
        /* @media screen and (max-width: 720px) {
            width: 40px;
        } */
    }
`;
