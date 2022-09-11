import styled from 'styled-components';


export const Content = styled.div`
    display: grid;
    // set to repeat the columns, and then set it to auto fill, and then when its 200px wide it cant' go lower so it removes 1 column instead to make it responsive for mobile
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr)); //css grid syntax here for a responsive grid
    grid-gap: 1.5rem;
  
`;

export const PhotoContainer = styled.div`
    height: 300px;
    width: 300px;
    margin-top: 20px;
    transition: 1s;

    p {
        margin-top: 10px;
        font-size: smaller;
        text-transform: uppercase;
        color: var(--steel);
        text-align: center;
    }

    .photo-tile:hover {
        background-color: var(--steam);
        justify-content: center;

        .checkbox {
            opacity: 1;
            cursor: pointer;
        }
    }

    .tile-select-checkbox {
        height: 300px;
        width: 300px;
        position: absolute;
    }
    
    .tile-select-checkbox-span {
        position: relative;
        top: 13px;
        left: 13px;
    }

    .checkbox {
        height: 19px;
        width: 19px;
        opacity: 0;
    }

    .checkbox:checked {
        opacity: 1;
        cursor:pointer;
    }

`;

export const PhotoTile = styled.div`
    height: 300px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;

    .photo-image-wrapper {
        z-index: 1;
    }
    .photo-image-wrapper:hover{
        /* cursor: pointer; */
    }
`;

interface PhotoThumbnailProps {
    imageURL: string,
    height: number,
    width: number,
    selected: boolean
}

export const PhotoImage = styled.div<PhotoThumbnailProps>`
    //passing in the dimensions of the photo to determine the layout
    width: ${props => props.selected ? (props.width - 10) + "px" : (props.width) + "px"};
    height: ${props => props.selected? (props.height -10) + "px" : (props.height) + "px"};
    background-color: var(--steam);
    display: flex;
    justify-content: start;
    align-items: flex-end;
    color: white;
    border: none;
    background: url(${props => props.imageURL}), var(--steam);

    background-size: cover;
    background-position: center;
    
    transition: .3s;

    :hover {
        cursor: pointer; 
    }
`;
