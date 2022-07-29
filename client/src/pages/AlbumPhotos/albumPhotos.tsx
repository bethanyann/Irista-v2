import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
//hooks
import { useAlbumPhotoFetch } from '../../hooks/useAlbumPhotoFetch';
//styles
import { Modal } from 'antd';
import { Wrapper, Header, Content, PhotoContainer, PhotoTile, Photo} from './albumPhotos.styles';
import AddIcon from '../../images/icons/add.png';


const AlbumPhotos = () => {
    const { albumName } = useParams();   
    const formattedAlbumName = albumName!.substring(albumName!.indexOf("/") + 1);
    const [ isOpen, setIsOpen ] = useState(false);

    const { photos, loading, error } = useAlbumPhotoFetch(albumName!);

    const handleModalOpen = () => {
        setIsOpen(true);
    }

    const handleModalClose = () => {
        setIsOpen(false);
    }

    const handlePhotoUpload = () => {
        //upload photos here
        //I really need to figure out how to get the upload to the backend
        //just call method from upload component here  
    }

    if(loading) {
        return <div> Loading photos ... </div>
    }

    return (
        <>
        <Wrapper>
            <Header>
                <h3>{formattedAlbumName}</h3>
                <img src={AddIcon} alt='add button' onClick={handleModalOpen} />
            </Header>
            <div className="divider"></div>
            <Content>
            
                {
                    photos ? photos.resources.map((photo) => (
                        <PhotoTile key={photo.asset_id}>
                            <div className='tile-select-checkbox'>
                                <span>
                                    <input type='checkbox' className='checkbox' />
                                </span>
                            </div>
                            <Photo src={photo.secure_url} />
                        </PhotoTile>
                    )) : null
                }
              
            </Content>
        </Wrapper>

        <Modal visible={isOpen} onOk={handlePhotoUpload} onCancel={handleModalClose}>
            <p> upload component goes here </p>
        </Modal>
        </>
      
    )
}

export default AlbumPhotos;