import React from 'react';
import { Photo } from '../../models/types';
import { Wrapper } from './photoThumb.styles';
import { Image } from 'antd';
import LoadingImage from '../../images/fallback-img.png';
import { buildUrl, extractPublicId } from 'cloudinary-build-url';


interface IProps {
    photo: Photo,
}

const PhotoThumbnail = ({ photo } : IProps) => {
    

    const photo_publicId = extractPublicId(photo.secure_url);
    const previewUrl = buildUrl(`${photo_publicId}`, {
        cloud: {
            cloudName: 'bethany',
           
        },
        transformations: {
            effect: {
                name: 'blur',
                value: 1000
            },
            quality: 1
        }
    });
    debugger;

    return (
        <Wrapper>
        {/*  <Thumbnail src={photo.secure_url} alt='individual image thumbnail' /> */}
            <Image 
                className="image-thumbnail"
                style={{height:"150px", width:"auto", transition:"all 1s", objectFit:"cover"}}
                src={photo.secure_url}
                loading="eager"
                preview={false}
                fallback={LoadingImage}
                placeholder={
                    <Image 
                        preview={false}
                        src={previewUrl}
                        style={{height:"150px", width:"auto", transition:"all 1s", objectFit:"cover"}}
                        fallback={LoadingImage}
                    />
                }
            />
        </Wrapper>
    )
}

export default PhotoThumbnail;