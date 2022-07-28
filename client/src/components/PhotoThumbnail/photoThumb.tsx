import React from 'react';
import { Link } from 'react-router-dom';
import { Photo } from '../../models/types';
import { Wrapper, Thumbnail, CheckboxContainer } from './photoThumb.styles';

interface IProps {
    photo: Photo,
    //handleModalOpen: () => {}
}

const PhotoThumbnail = ({ photo } : IProps) => {
    return (
        <Wrapper>
            {/* <CheckboxContainer>
                <input type="checkbox"/> */}
            
            <Thumbnail src={photo.secure_url} alt='photo-thumbnail' />
            {/* </CheckboxContainer> */}
        </Wrapper>
    )
}

export default PhotoThumbnail;