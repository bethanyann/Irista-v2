import React, { Suspense } from 'react';
import { Photo } from '../../models/types';
import { Wrapper, Thumbnail } from './photoThumb.styles';
import { Image } from 'antd';
import LoadingImage from '../../images/fallback-img.png';

interface IProps {
    photo: Photo,
    //handleModalOpen: () => {}
}

const PhotoThumbnail = ({ photo } : IProps) => {
    return (
        <Wrapper>
            {/* <Suspense fallback={ <Image src="error" width={"auto"} height={"150px"} fallback={LoadingImage}/>}> */}
                <Thumbnail src={photo.secure_url} alt='individual image thumbnail' />
            {/* </Suspense> */}
        </Wrapper>
    )
}

export default PhotoThumbnail;