import React from 'react';
import { useParams } from 'react-router-dom';
//hooks
import { useAlbumPhotoFetch } from '../../hooks/useAlbumPhotoFetch';

const AlbumPhotos = () => {
    const { albumName } = useParams();
    console.log(albumName);
   
    const { photos, loading, error } = useAlbumPhotoFetch(albumName!);

    return (
        <div>

        </div>
    )
}

export default AlbumPhotos;