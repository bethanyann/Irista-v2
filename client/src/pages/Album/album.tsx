import * as React from 'react';
import { Wrapper, Content, NewAlbumButton } from './album.styles';


const Album = () => {
    //this will eventually have a hook that will grab all albums for a user here
    //add a new album button before all of the other album data

    return (
        <Wrapper>
            <h3>My Albums</h3>
            <div className='divider'></div>
            <Content>
                <NewAlbumButton>New Album<span className='red-plus'>+</span></NewAlbumButton>
            </Content>
        </Wrapper>
    )

}

export default Album;