import React, { useContext, useState } from 'react';
import { groupBy } from 'lodash';
import { AuthContext } from '../../context/authContext';
import { Wrapper, Content } from './photoGrid.styles';
import { usePhotoFetch } from '../../hooks/usePhotoFetch';
//components
import PhotoThumbnail from '../../components/PhotoThumbnail/photoThumb';
import PhotoInfo from './../PhotoInfo/photoInfo';

const PhotoGrid = () => {
    const { user } = useContext(AuthContext); 
  
    const [ isOpen, setIsOpen ] = useState(false);
    const [ activePhotoId, setActivePhotoId ] = useState("");

    const { state, loading, error, setIsLoadingMore } =  usePhotoFetch(user); 

    if(error) return <div> Something went wrong...</div>;
    
    //const stateIsAnArray = Array.isArray(state) ? true : false;
    //debugger;
    //const test = groupBy(state,  photo => { return photo.created_at }).value();
    //console.log(test);
    //setFilteredPhotos(state.groupBy(photo => { return photo.created_at }));
    //console.log(filteredPhotos);
    
    const handleModalOpen = (photoId) => {
        setActivePhotoId(photoId);
        setIsOpen(true);
    }

    const handleModalClose = () => {
        setIsOpen(false);
        setActivePhotoId(null);
    }

    return(
        <Wrapper>
            <h3>Timeline</h3>
            <div className='divider'></div>
            <Content>
                {
                    state ? state.map((photo) => (
                        <div key={photo.asset_id} onClick={() => handleModalOpen(photo.public_id)}>
                            <PhotoThumbnail alt='photo-thumbnail' photo={photo}/>
                        </div>  
                    )) : null
                }
                {/* {
                    state && Object.keys(state).length > 0 ?  (
                        Object.values(state).map(photo => (
                            <PhotoThumbnail alt='photo-thumbnail' key={photo.asset_id} photo={photo} />
                        ))
                    ) : null
                } */}

                 <PhotoInfo visible={isOpen} photoId={activePhotoId} onClose={handleModalClose}/> 
                
            </Content>
        </Wrapper>
    )
}

export default PhotoGrid;