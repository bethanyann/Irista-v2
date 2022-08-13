import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { Wrapper, Content, FullPageContainer, EmptyAlbum } from './timelineGrid.styles';
import { usePhotoFetch } from '../../hooks/usePhotoFetch';
import Moment from 'react-moment';
//icon
import AlbumIcon from '../../images/icons/photo_album.png';
//components
import PhotoThumbnail from '../../components/PhotoThumbnail/photoThumb';
import PhotoInfo from '../PhotoInfo/photoInfo';
import LoadingSpinner from '../../components/LoadingSpinner/spinner';


const PhotoGrid = () => {
    const { user } = useContext(AuthContext); 
   
    const [ isOpen, setIsOpen ] = useState(false);
    const [ activePhotoId, setActivePhotoId ] = useState("");
    
    const { state, loading, error, setIsLoadingMore } =  usePhotoFetch(user); 

    const handleModalOpen = (photoId) => {
        setActivePhotoId(photoId);
        setIsOpen(true);
    }

    const handleModalClose = () => {
        setIsOpen(false);
    }

    if(false) {
        return(
            <FullPageContainer>
                <h2> Error Fetching Content </h2>
            </FullPageContainer>
        )
    };
    if(loading) {
        return (
            <FullPageContainer>
                <h2 style={{marginBottom:'50px'}}>Loading Photos</h2>
                <LoadingSpinner />
            </FullPageContainer>
        )
    } 
    if(!state) {
        return (
            <FullPageContainer>
                <EmptyAlbum>
                    <h2>Looks like you don't have any photos uploaded yet!</h2>
                    <p>Go to the Uploads page to get started, or head to the Albums page to create albums and organize your photos. </p>
                    <img src={AlbumIcon} alt="empty album icon"/>
                </EmptyAlbum>
            </FullPageContainer>
        );
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
                                <>
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
                                </>
                              )
                        })
                    ) : null
                }
                 <PhotoInfo visible={isOpen} photoId={activePhotoId} onClose={handleModalClose} /> 
                
            </Content>
        </Wrapper>
    )
 }

export default PhotoGrid;