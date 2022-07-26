import React from 'react';
import { Link } from 'react-router-dom';
import { Photo } from '../../models/types';
import { Wrapper, Thumbnail } from './photoThumb.styles';

interface IProps {
    photo: Photo,
    handleModalOpen: () => {}
}

const PhotoThumbnail = ({photo, handleModalOpen} : IProps) => {
    const encodedPhotoId = encodeURIComponent(photo.public_id);

    return (
        <Wrapper>
            <Link to={`/photo/${encodedPhotoId}`}>
                <Thumbnail src={photo.secure_url} alt='photo-thumbnail' />
            </Link> 

            {/* <Thumbnail src={photo.secure_url} alt='photo-thumbnail' /> */}
        </Wrapper>
    )
}

export default PhotoThumbnail;