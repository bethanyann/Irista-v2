import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
//context
import { AuthContext } from '../../context/authContext';
//types
import { User } from '../../models/types';
//hooks
import { useSearchResultsFetch }  from '../../hooks/useSearchResultsFetch';
//styles
import { Wrapper, Content, PhotoContainer, PhotoTile, PhotoImage, } from './searchResults.styles';
//components
import PhotoInfo from '../PhotoInfo/photoInfo';

const SearchResults = () => {
    const { searchTerm } = useParams();
    const { user, logout } = useContext(AuthContext);
    const userTest : User = user ? user : {} as User;
    const { searchResults, loading, error, errorMessage } = useSearchResultsFetch(searchTerm!, userTest);
    const [ activePhotoId, setActivePhotoId ] = useState('');
    const [ isPhotoModalOpen, setIsPhotoModalOpen ] = useState(false);

    const handlePhotoModalOpen = (photoId : string) => {
        setActivePhotoId(photoId);
        setIsPhotoModalOpen(true);
    }

    const handlePhotoModalClose = () => {
        setIsPhotoModalOpen(false);
        setActivePhotoId('');
    }

    
   
    return (
        <Wrapper>
            <h2>Search Results for "${searchTerm}"</h2>
            <div className='divider'></div>

            <Content>
                { (error || errorMessage !== '')  ? <div> ${errorMessage}</div> : null }

                {
                    searchResults && searchResults.total_count > 0 ? searchResults.resources.map((photo) => (
                        <PhotoContainer  key={photo.asset_id}>
                            <PhotoTile className='photo-tile' style={photo.isSelected ? {backgroundColor:'#f3f4fa', border:'1px solid var(--smoke)'} : { }}>
                                <div className='tile-select-checkbox'>
                                    <span className='tile-select-checkbox-span'>
                                        <input type='checkbox' className='checkbox' checked={photo.isSelected ?? false} />
                                    </span>
                                </div>
                                <div className='photo-image-wrapper' style={{zIndex:1}} onClick={() => handlePhotoModalOpen(photo.public_id)}>
                                    <PhotoImage src={photo.secure_url} style={photo.isSelected? {maxHeight:'290px', maxWidth:'290px'} : {}} />
                                </div>       
                            </PhotoTile>
                            <p style={{wordBreak:'break-word'}}>{(photo.filename ?? photo.original_filename ?? photo.public_id.substring(0, photo.public_id.lastIndexOf('/') + 1)) + "." + photo.format}</p>
                        </PhotoContainer>
                    )) : null
                }
            </Content>
            <PhotoInfo visible={isPhotoModalOpen} photoId={activePhotoId} onClose={handlePhotoModalClose} /> 
        </Wrapper>
    )
}

export default SearchResults;