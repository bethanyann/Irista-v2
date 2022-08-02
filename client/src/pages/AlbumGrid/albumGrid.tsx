import React, { useState, useContext } from 'react';
//context
import { AuthContext } from '../../context/authContext';
//styles
import { Wrapper, Content, NewAlbumButton, AlbumThumbnail } from './albumGrid.styles';
//components
import NewAlbumModal from '../../components/NewAlbumModal/newAlbumModal';
//hooks
import { useAlbumFetch } from '../../hooks/useAlbumFetch';
import { useNavigate } from 'react-router-dom';


const Album = () => {
    let navigate = useNavigate();
    const { user } = useContext(AuthContext); 
    const [ albumModalIsOpen, setAlbumModalIsOpen ] = useState(false);
    
    const { albums, loading, errors } = useAlbumFetch(user!);
    debugger;
    console.log(albums);

    const handleModalClose = () => {
        setAlbumModalIsOpen(false);
    }

    const handleOpenAlbum = (path : string) => {
        //take album path and redirect to an album/photo page
        const albumName = encodeURIComponent(path);
        console.log(albumName); 
        navigate(`/album/${albumName}`, {replace: true});
    }

    return (
        <Wrapper>
            <h3>My Albums</h3>
            <div className='divider'></div>
            <Content>
                <NewAlbumButton onClick={() => setAlbumModalIsOpen(true)}>New Album<span className='red-plus'>+</span></NewAlbumButton>
                {
                    albums ? albums.map((album) => (
                        <AlbumThumbnail key={album[0].path} image={album[1].secure_url ?? ""} onClick={() => handleOpenAlbum(album[0].path)}>{album[0].name}</AlbumThumbnail>
                    )) : null
                } 
            </Content>

            <NewAlbumModal visible={albumModalIsOpen} onClose={handleModalClose} />
        </Wrapper>
    )

}

export default Album;