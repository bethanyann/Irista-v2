import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { Wrapper, Content, FullPageContainer, EmptyAlbum } from './timelineGrid.styles';
import { usePhotoTimelineFetch } from '../../hooks/usePhotoTimelineFetch';
import Moment from 'react-moment';
//icon
import AlbumIcon from '../../images/icons/photo_album.png';
//components
import PhotoThumbnail from '../../components/PhotoThumbnail/photoThumb';
import PhotoInfo from '../PhotoInfo/photoInfo';
import LoadingSpinner from '../../components/Loading/spinner';
import TimelineLoadingSkeleton from '../../components/Loading/timelineSkeleton';
import { Button } from 'antd';


const PhotoGrid = () => {
    const { user } = useContext(AuthContext); 
   
    const [ isOpen, setIsOpen ] = useState(false);
    const [ activePhotoId, setActivePhotoId ] = useState("");
    
    const { state, loading, error, setIsLoadingMore } =  usePhotoTimelineFetch(user); 


    //trying something here, going to use useQuery instead to switch this over
    //actually no because i want to switch this over to getting data from the database so I am not going to fiddle with this for now.

    const handleModalOpen = (photoId) => {
        setActivePhotoId(photoId);
        setIsOpen(true);
    }

    const handleModalClose = () => {
        setIsOpen(false);
    }

    const handleLoadMorePhotos = (e) => {
         e.preventDefault(); 
         setIsLoadingMore(true);
    }

    if(error) {
        return(
            <FullPageContainer>
                <h2> Error Fetching Content </h2>
            </FullPageContainer>
        )
    };

    // if(true) {
    //     return (
    //         <FullPageContainer>
    //             <TimelineLoadingSkeleton />
    //         </FullPageContainer>
    //     )
    // } 
    
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
                    state.sortedPhotos && Object.keys(state.sortedPhotos).length > 0 ?  (
                        Object.keys(state.sortedPhotos).map(function(date) {
                            return (
                                <>
                                <div key={date + "_" + Math.random()} style={{width:'100%'}}>
                                    <h4 className="header-date"><Moment format="D MMMM YYYY">{date}</Moment></h4>
                                </div>
                                  {
                                    state.sortedPhotos[date].map(photo => {
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
            <div className="button-container">
                {
                    state.next_cursor && !loading ? (
                        <Button className="load-more-btn" onClick={(e) => handleLoadMorePhotos(e)} type='text' style={{backgroundColor:"#a30101", color:"white"}}>Load More</Button>
                    ) : null
                }
            </div>
        </Wrapper>
    )
 }

export default PhotoGrid;