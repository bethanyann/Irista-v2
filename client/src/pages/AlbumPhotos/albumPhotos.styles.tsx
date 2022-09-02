import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: var(--maxWidthDesktop);  //control the width of the grid only displaying 5 in a row, maybe play with this if I decide to go full-screen with it
    margin: 0 auto;
    padding: 20px 20px 20px 20px;

    .divider {
        border-bottom: 1px solid var(--steam);
        margin-bottom: 20px;
    }

`;

export const Header = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    h3 {
        color: var(--slate);
        font-weight: 500;
        @media screen and (max-width: 768px) {

        }
        font-size: 1.3em;
    }

    img {
        height: 25px;
    }

    img:hover {
        cursor: pointer;
    }

`;


