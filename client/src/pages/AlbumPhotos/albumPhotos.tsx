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
                                    <input type='checkbox' />
                                </span>
                            </div>
                            <Photo src={photo.secure_url} />
                        </PhotoTile>
                    )) : null
                }
              
            </Content>
        </Wrapper>

        <Modal visible={isOpen}>
            
        </Modal>
        </>
      
    )
}

export default AlbumPhotos;