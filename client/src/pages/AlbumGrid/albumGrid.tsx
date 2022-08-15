import React, { useState, useContext } from 'react';
//context
import { AuthContext } from '../../context/authContext';
//styles
import { Wrapper, Content, NewAlbumButton, AlbumThumbnail, FullPageContainer } from './albumGrid.styles';
//components
import NewAlbumModal from '../../components/NewAlbumModal/newAlbumModal';
import LoadingSpinner from '../../components/LoadingSpinner/spinner';
//hooks
import { useAlbumFetch } from '../../hooks/useAlbumFetch';
import { useNavigate } from 'react-router-dom';
//image
import NoImage from '../../images/no-image.png';

const Album = () => {
    let navigate = useNavigate();
    const { user } = useContext(AuthContext); 
    const [ albumModalIsOpen, setAlbumModalIsOpen ] = useState(false);
    
    const { albums, loading, errors } = useAlbumFetch(user!);

    const handleModalClose = () => {
        setAlbumModalIsOpen(false);
    }

    const handleOpenAlbum = (path : string) => {
        //take album path and redirect to an album/photo page
        const albumName = encodeURIComponent(path);
        navigate(`/album/${albumName}`, {replace: true});
    }

    if(errors) {
        return(
            <FullPageContainer>
                <h2> Error Fetching Content </h2>
            </FullPageContainer>
        )
    }

    if(loading) {
        return (
            <FullPageContainer>
                <LoadingSpinner title="Loading Albums" />
            </FullPageContainer>
        )
    } 

    return (
        <Wrapper>
            <h3>My Albums</h3>
            <div className='divider'></div>
            <Content>
                <NewAlbumButton onClick={() => setAlbumModalIsOpen(true)}>New Album<span className='red-plus'>+</span></NewAlbumButton>
                {
                    albums && albums.length > 0 ? albums.map((album) => (
                        <AlbumThumbnail key={album[0].path} image={album[1].secure_url ?? NoImage} onClick={() => handleOpenAlbum(album[0].path)}>{album[0].name}</AlbumThumbnail>
                    )) : null
                } 
            </Content>

            <NewAlbumModal visible={albumModalIsOpen} onClose={handleModalClose} />
        </Wrapper>
    )

}

export default Album;