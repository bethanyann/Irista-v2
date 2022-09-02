import React, { useState } from 'react';
//types
import { Photo, Photos } from '../../models/types';
// styles
import { Content, PhotoContainer, PhotoTile, PhotoImage } from './photoGrid.styles';
// component
import PhotoInfo from '../../pages/PhotoInfo/photoInfo';

// TODO fix the types so that either photo results or search results can be passed in here 
// TODO put the select box onclick and handlers in here too 

interface Props {
    photos: Photos | undefined,
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedPhotos: React.Dispatch<React.SetStateAction<Set<string>>>
}

const PhotoGrid = ({ photos, setSelectedPhotos, setIsSelected }: Props) => {
    //see what the structure of photos/photo is here
    const [ activePhotoId, setActivePhotoId ] = useState('');
    const [ isPhotoModalOpen, setIsPhotoModalOpen ] = useState(false);
 
    const handlePhotoModalOpen = (photoId : string) => {
        setActivePhotoId(photoId);
        setIsPhotoModalOpen(true);
    }

    const handlePhotoModalClose = () => {
        setIsPhotoModalOpen(false);
        setActivePhotoId('');
    }

    const handleSelectPhoto = (event: any, photo: Photo) => {
        if(event.target.checked){
            //add photo id to set
            photo.isSelected = true;
            setSelectedPhotos((prev: Set<string>) => new Set(prev).add(photo.public_id));
            setIsSelected(true);
        } else {
            //delete photo from set
            photo.isSelected = false;
            setSelectedPhotos((prev: Set<string>) => {
                const next = new Set(prev);
                next.delete(photo.public_id);
                return next;
            })
            setIsSelected(false);
        }
    }
    
    return (
        <>
        <Content>
            { photos ? photos.resources.map((photo: any) => (
                <PhotoContainer  key={photo.asset_id}>
                    <PhotoTile className='photo-tile' style={photo.isSelected ? {backgroundColor:'#f3f4fa', border:'1px solid var(--smoke)'} : {border:'1px solid var(--snow)'}}>
                        <div className='tile-select-checkbox'>
                            <span className='tile-select-checkbox-span'>
                                <input type='checkbox' className='checkbox' checked={photo.isSelected ?? false} onChange={event => handleSelectPhoto(event, photo)}/>
                            </span>
                        </div>
                        <PhotoImage imageURL={photo.secure_url} selected={photo.isSelected} width={photo.height > photo.width ? 200 : 300} height={photo.height > photo.width ? 300 : 200} /> {/*style={photo.isSelected? {maxHeight:'290px', maxWidth:'290px', transition:'10s'}:{transition: '1s'}} */}
                    </PhotoTile>
                    <p style={{wordBreak:'break-word'}}>{(photo.filename ?? photo.original_filename ?? photo.public_id.substring(photo.public_id.lastIndexOf('/') + 1)) + "." + photo.format}</p>
                </PhotoContainer>
            )) : null
            }
        </Content>
        <PhotoInfo visible={isPhotoModalOpen} photoId={activePhotoId} onClose={handlePhotoModalClose} /> 
        </>
    )
}

export default PhotoGrid;