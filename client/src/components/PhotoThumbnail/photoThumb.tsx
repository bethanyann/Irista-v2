import React from 'react';
import { Photo } from '../../models/types';
import { Wrapper, Thumbnail } from './photoThumb.styles';
import { Image } from 'antd';
// import LoadingImage from '../../images/fallback-img.png';
import { buildUrl, extractPublicId } from 'cloudinary-build-url';


interface IProps {
    photo: Photo,
    //handleModalOpen: () => {}
}

const PhotoThumbnail = ({ photo } : IProps) => {

    const previewUrl = buildUrl(`${photo.public_id}`, {
        cloud: {
            cloudName: 'bethany',
           
        },
        transformations: {
            effect: {
                name: 'blur',
                value: 1000
            }
        }
    });
   debugger;
    //this works but the photo is public
    //const previewUrl = "https://res.cloudinary.com/demo/image/upload/c_fill,e_pixelate/cld-sample-4";

    return (
        <Wrapper>
{/*                <Thumbnail src={photo.secure_url} alt='individual image thumbnail' /> */}

            <Image 
                style={{height:"150px", width:"auto", transition:"all 0.3s", objectFit:"cover"}}
                src={photo.secure_url}
                preview={false}
                placeholder={
                    <Image 
                        preview={false}
                        src={previewUrl}
                        style={{height:"150px", width:"auto", transition:"all 0.3s", objectFit:"cover"}}
                    />
                }
            />
        </Wrapper>
    )
}

export default PhotoThumbnail;