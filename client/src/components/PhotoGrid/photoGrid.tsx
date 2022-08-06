import React, { useState } from 'react';
//types
import { Photo } from '../../models/types';
// styles
import { Content, PhotoContainer, PhotoTile, PhotoImage } from './photoGrid.styles';
// component
import PhotoInfo from '../../pages/PhotoInfo/photoInfo';

// TODO fix the types so that either photo results or search results can be passed in here 
// TODO put the select box onclick and handlers in here too 

const PhotoGrid = ({ photos, setSelectedPhotos, setIsSelected }: any) => {

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
            { photos && photos.total_count > 0 ? photos.resources.map((photo: any) => (
                <PhotoContainer  key={photo.asset_id}>
                    <PhotoTile className='photo-tile' style={photo.isSelected ? {backgroundColor:'#f3f4fa', border:'1px solid var(--smoke)'} : { }}>
                        <div className='tile-select-checkbox'>
                            <span className='tile-select-checkbox-span'>
                                <input type='checkbox' className='checkbox' checked={photo.isSelected ?? false} onChange={event => handleSelectPhoto(event, photo)}/>
                            </span>
                        </div>
                        <div className='photo-image-wrapper' style={{zIndex:1}} onClick={() => handlePhotoModalOpen(photo.public_id)}>
                            <PhotoImage src={photo.secure_url} style={photo.isSelected? {maxHeight:'290px', maxWidth:'290px'} : {}} />
                        </div>       
                    </PhotoTile>
                    <p style={{wordBreak:'break-word'}}>{(photo.filename ?? photo.original_filename ?? photo.public_id.substring(0, photo.public_id.lastIndexOf('/') + 1)) + "." + photo.format}</p>
                </PhotoContainer>
            )) : null
            }
        </Content>
        <PhotoInfo visible={isPhotoModalOpen} photoId={activePhotoId} onClose={handlePhotoModalClose} /> 
        </>
    )
}

export default PhotoGrid;