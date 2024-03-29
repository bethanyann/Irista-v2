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
    display: grid;
    // set to repeat the columns, and then set it to auto fill, and then when its 200px wide it cant' go lower so it removes 1 column instead to make it responsive for mobile
    grid-template-columns: repeat(auto-fill, minmax(275px, 0fr)); //css grid syntax here for a responsive grid
    grid-gap: 1.3rem; //spacing between rows/columns

    /* @media screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); //css grid syntax here for a responsive grid
    }

    @media screen and (max-width: 500px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); //css grid syntax here for a responsive grid
    } */

`;

export const NewAlbumButton = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background-color: var(--steam);
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 410;

    :hover {
        cursor: pointer;
        background-color: var(--smoke);
    }

    .red-plus {
        font-weight: 600;
        margin-left: 5px;
        font-size: 1.1rem;
        color: var(--red);
    }
`;

interface AlbumThumbnailProps {
    image: any
}

export const AlbumThumbnail = styled.div<AlbumThumbnailProps>`
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background-color: var(--steam);
    display: flex;
    justify-content: start;
    align-items: flex-end;
    color: white;
    font-weight: 410;
    font-size: x-large;
    padding-left: 15px;
    padding-bottom: 3px;

    cursor: pointer;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 46%,
        rgba(0, 0, 0, 0.9) 89%
    ),
    url(${props => props.image}), var(--steam);

    /* background: url(${props => props.image}), var(--steam); */
    background-size: cover;
    background-position: center;
    

    :hover {
        background-color: var(--smoke);
    }
`;

export const FullPageContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--fog);
    z-index: -1;
`;

