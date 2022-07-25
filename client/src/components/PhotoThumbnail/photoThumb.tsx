import React from 'react';
import { Link } from 'react-router-dom';
import { Photo } from '../../models/types';
import { Wrapper, Thumbnail } from './photoThumb.styles';

interface IProps {
    photo: Photo,
}

const PhotoThumbnail = ({photo} : IProps) => {

    return (
        <Wrapper>
            <Link to={`/photo/${photo.asset_id}`}>
                <Thumbnail src={photo.secure_url} alt='photo-thumbnail' />
            </Link> 
        </Wrapper>
    )
}

export default PhotoThumbnail;