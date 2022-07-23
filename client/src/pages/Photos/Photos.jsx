import React, { useEffect, useState, useContext } from 'react';
import isEmpty from 'lodash';
import { AuthContext } from '../../context/authContext';
import { User, Photos, Photo } from '../../models/types';
import { Wrapper, Content } from './photos.styles';
import { usePhotoFetch } from '../../hooks/usePhotoFetch';
import { API_KEY, API_SECRET } from '../../config';
import axios from 'axios';
import { ASTValidationContext } from 'graphql/validation/ValidationContext';

const PhotoGrid = () => {
    const { user } = useContext(AuthContext); 
    //const unknownUser = user as unknown;
    //const loggedInUser = unknownUser as User;

    debugger;
    //get all the photos for the user here
    //const { state, loading, error, setIsLoadingMore } =  usePhotoFetch(loggedInUser.username); 
    
   

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