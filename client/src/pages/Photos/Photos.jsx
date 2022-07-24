import React, { useEffect, useState, useContext } from 'react';
import isEmpty from 'lodash';
import { AuthContext } from '../../context/authContext';
import { User, Photos, Photo } from '../../models/types';
import { Wrapper, Content } from './photos.styles';
import { usePhotoFetch } from '../../hooks/usePhotoFetch';

const PhotoGrid = () => {
    const { user } = useContext(AuthContext); 
    debugger;
    //get all the photos for the user here
    const { state, loading, error, setIsLoadingMore } =  usePhotoFetch(user); 

    console.log(state);
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