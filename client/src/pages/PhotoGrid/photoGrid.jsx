import React, { useContext, useState } from 'react';
import { groupBy } from 'lodash';
import { AuthContext } from '../../context/authContext';
import { Wrapper, Content } from './photoGrid.styles';
import { usePhotoFetch } from '../../hooks/usePhotoFetch';
import Moment from 'react-moment';
//components
import PhotoThumbnail from '../../components/PhotoThumbnail/photoThumb';
import PhotoInfo from './../PhotoInfo/photoInfo';

const PhotoGrid = () => {
    const { user } = useContext(AuthContext); 
    
    const [ isOpen, setIsOpen ] = useState(false);
    const [ activePhotoId, setActivePhotoId ] = useState("");
    
    const { state, loading, error, setIsLoadingMore } =  usePhotoFetch(user); 

    if(error) return <div> Something went wrong...</div>;
   
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
                    state && Object.keys(state).length > 0 ?  (
                        Object.keys(state).map(function(date) {
                            return (
                                <div key={date}>
                                <div key={date} style={{width:'100%'}}>
                                    <h4 className="header-date"><Moment format="D MMMM YYYY">{date}</Moment></h4>
                                </div>
                                  {
                                    state[date].map(photo => {
                                        return (
                                            <div key={photo.asset_id} onClick={() => handleModalOpen(photo.public_id)}>
                                                <PhotoThumbnail alt='photo-thumbnail' photo={photo}/>
                                            </div>
                                        )
                                    })
                                  }
                                </div>
                              )
                        })
                    ) : null
                }
                 <PhotoInfo visible={isOpen} photoId={activePhotoId} onClose={handleModalClose}/> 
                
            </Content>
        </Wrapper>
    )
}

export default PhotoGrid;