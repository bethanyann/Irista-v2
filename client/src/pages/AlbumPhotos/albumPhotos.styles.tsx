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

    h3{
        color: var(--slate);
        font-weight: 500;
        @media screen and (max-width: 768px){

        }
        font-size: 1.3em;
    }

    img {
        height: 25px;
    }

    img:hover{
        cursor: pointer;
    }

`;


export const Content = styled.div`
    display: grid;
    // set to repeat the columns, and then set it to auto fill, and then when its 200px wide it cant' go lower so it removes 1 column instead to make it responsive for mobile
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr)); //css grid syntax here for a responsive grid
    grid-gap: 1.5rem;
  
`;

export const PhotoContainer = styled.div`
    display:flex;
    justify-content:space-between ;
    align-items: center;
`;

export const PhotoTile = styled.div`
    height: 300px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    //transition: .3s;

    .tile-select-checkbox {
        height: 300px;
        width: 300px;
        position: absolute;
    }
    
    .tile-select-checkbox-span {
        position: relative;
        top: 13px;
        left: 13px;
        opacity: 0;
    }

    .checkbox {
        height: 19px;
        width: 19px;
    }

    //checkbox div with a span inside it and then the input inside of that
    :hover {
        background-color: var(--steam);
        justify-content: center;

        .tile-select-checkbox-span {
            opacity: 1;
        }

        .checkbox {
            cursor: pointer;
        }
    } 

  
`;

export const PhotoImage = styled.img`
    max-height: 300px;
    max-width: 300px;
    //position: absolute;
    border-radius: 2px;
    transition: .3s;
    
    /* :hover {   
        max-height: 290px;
        max-width: 290px;
    } */

`
