import React, { useState, useContext } from 'react';
// context 
import { AuthContext } from '../../context/authContext';
// styles
import { Wrapper, Content, NewAlbumButton, AlbumThumbnail, FullPageContainer } from './albumGrid.styles';
// components
import NewAlbumModal from '../../components/NewAlbumModal/newAlbumModal';
// hooks
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
// image
import NoImage from '../../images/no-image.png';
import { User, Album } from '../../models/types';

const GET_ALBUMS = gql`
    query getAlbumsQuery($username: String!) {
        getAlbums(username: $username) {
            albumId,
            albumName,
            createdBy,
            coverPhotoUrl
        }
    }
`
interface Albums {
    getAlbums: Album[];
}
interface AlbumVars {
    username: string;
}

const AlbumGrid = () => {
    let navigate = useNavigate();
    const { user } = useContext(AuthContext); 
    const [ albumModalIsOpen, setAlbumModalIsOpen ] = useState(false);
    
    // TODO - really need to fix the AuthContext to not send back a null user so I don't have to do mess like this
    const _user = user as unknown as User;
    const username = _user.username ?? "";
    
    const { data, loading, error} = useQuery<Albums, AlbumVars>(GET_ALBUMS, {
        variables: { username },
    });
  
    debugger;

    const handleModalClose = () => {
        setAlbumModalIsOpen(false);
        // TODO - need to refresh album list to display new album 
    }

    const handleOpenAlbum = (albumId: number) => {
        // takes album path and redirect to an album/photo page
        const albumIdEncoded = encodeURIComponent(albumId);

        // TODO - This doesn't allow you to go "back" to the albums page - check on this
        navigate(`/album/${albumIdEncoded}`, {replace: true});
    }

    if(error) {
        return(
            <FullPageContainer>
                <h2> Error Fetching Content </h2>
            </FullPageContainer>
        )
    }

    // if(loading) {
    //     return (
    //         <FullPageContainer>
    //             <LoadingSpinner title="Loading Albums" />
    //         </FullPageContainer>
    //     )
    // } 

    return (
        <Wrapper>
            <h3>My Albums</h3>
            <div className='divider'></div>
            <Content>
                <NewAlbumButton onClick={() => setAlbumModalIsOpen(true)}>New Album<span className='red-plus'>+</span></NewAlbumButton>
                {
                     !loading && data ?
                         data.getAlbums.map((album) => (
                            <AlbumThumbnail key={album.albumId} image={album.coverPhotoUrl ?? NoImage } onClick={() => handleOpenAlbum(album.albumId)}>{album.albumName}</AlbumThumbnail>
                         ))
                     : null
                }
            </Content>
            <NewAlbumModal visible={albumModalIsOpen} onClose={handleModalClose} />
        </Wrapper>
    )

}

export default AlbumGrid;