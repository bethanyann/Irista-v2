import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: var(--maxWidthDesktop);  //control the width of the grid only displaying 5 in a row, maybe play with this if I decide to go full-screen with it
    margin: 0 auto;
    padding: 20px 20px 20px 20px;

    h3{
        color: var(--medGrey);
        font-weight: 500;
        @media screen and (max-width: 768px){
            font-size: var(--fontBig);
        }
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
        font-size: 1.2em;
        color: var(--silver);
        letter-spacing: .4px;
    }
`;

