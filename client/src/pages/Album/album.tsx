import React, { useState, useContext } from 'react';
//context
import { AuthContext } from '../../context/authContext';
//styles
import { Wrapper, Content, NewAlbumButton, AlbumThumbnail } from './album.styles';
//components
import NewAlbumModal from '../../components/NewAlbumModal/newAlbumModal';
//hooks
import { useAlbumFetch } from './../../hooks/useAlbumFetch';


const Album = () => {
    const { user } = useContext(AuthContext); 
    const [ albumModalIsOpen, setAlbumModalIsOpen ] = useState(false);
    
    const { albums, loading, errors } = useAlbumFetch(user!);
    debugger;
    
    const handleModalClose = () => {
        setAlbumModalIsOpen(false);
    }

    const handleOpenAlbum = (path : string) => {
        //take album path and redirect to an album/photo page
    }

    return (
        <Wrapper>
            <h3>My Albums</h3>
            <div className='divider'></div>
            <Content>
                <NewAlbumButton onClick={() => setAlbumModalIsOpen(true)}>New Album<span className='red-plus'>+</span></NewAlbumButton>
                 {
                    albums ? albums.folders.map((album) => (
                        <AlbumThumbnail key={album.path} onClick={() => handleOpenAlbum(album.path)}>{album.name}</AlbumThumbnail>
                    )) : null
                } 
            </Content>

            <NewAlbumModal visible={albumModalIsOpen} onClose={handleModalClose} />
        </Wrapper>
    )

}

export default Album;