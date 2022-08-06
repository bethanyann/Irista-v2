import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: var(--maxWidthDesktop);  //control the width of the grid only displaying 5 in a row, maybe play with this if I decide to go full-screen with it
    margin: 0 auto;
    padding: 20px 20px 20px 20px;

    h3{
        color: var(--slate);
        font-weight: 500;
        @media screen and (max-width: 768px){
           // font-size: var(--fontBig);
        }
        font-size: 1.3em
    }

    .divider {
        border-bottom: 1px solid var(--steam);
        margin-bottom: 20px;
    }
`;


export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    flex-wrap: wrap;

    .header-date{
        font-size: 1.1em;
        color: #b0b0b0;
        /* letter-spacing: .4px; */
        margin-bottom: 15px;
        margin-top: 15px;
    }
`;

