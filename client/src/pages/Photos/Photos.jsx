import React, { useEffect, useState, useContext } from 'react';
import isEmpty from 'lodash';
import { AuthContext } from '../../context/authContext';
import { Wrapper, Content } from './photos.styles';

const Photos = () => {
    const { user } = useContext(AuthContext); 
    const isUserLoggedOut = isEmpty(user);  

    if(!isUserLoggedOut){
        //get all the photos for the user here 
    }


    return(
        <Wrapper>
            <h3>Timeline</h3>
            <div className='divider'></div>
            <Content>
            </Content>
        </Wrapper>
    )
}

export default Photos;