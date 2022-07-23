import React, { useEffect, useState, useContext } from 'react';
import isEmpty from 'lodash';
import { AuthContext } from '../../context/authContext';
import { User, Photos, Photo } from '../../models/types';
import { Wrapper, Content } from './photos.styles';
import { usePhotoFetch } from '../../hooks/usePhotoFetch';
import { API_KEY, API_SECRET } from '../../config';

const PhotoGrid = () => {
    const { user } = useContext(AuthContext); 
    debugger;
    //get all the photos for the user here
    //const { state, loading, error, setIsLoadingMore } =  usePhotoFetch(loggedInUser.username); 
    
    const getImages = async () => {
        try{
            const result = await fetch(`/api/getPhotos/${user.username}`);
            const data = await result.json();
            
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getImages();
    }, []);

    return(
        <Wrapper>
            <h3>Timeline</h3>
            <div className='divider'></div>
            <Content>
            </Content>
        </Wrapper>
    )
}

export default PhotoGrid;