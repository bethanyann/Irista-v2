import { useState, useEffect} from 'react';
import { Photos } from '../models/types';

import { isPersistedState } from '../utilities/helpers';

export const useAlbumPhotoFetch =  (albumName:string) => {
    const [ photos, setPhotos ] = useState<Photos>();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);

    const fetchPhotos = async (albumName: string) => {
        try { 
            setLoading(true);
            setError(false);

            if(albumName)
            {
                albumName = encodeURIComponent(albumName);
                const photos = await fetch(`/api/getAlbumPhotos/${albumName}`);
                const results = await photos.json();
                
                setPhotos(results);
            }
        } catch(error) {
            setLoading(false);
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        const sessionState = isPersistedState(`${albumName}`);
        if(!sessionState) {
            console.log('grabbing from session storage');
            fetchPhotos(albumName);
        }
        else {
            console.log('grabbing from api');
            setPhotos(sessionState);
            return;
        }
    }, [albumName, setPhotos] );

    return { photos, setPhotos, loading, error, setIsLoadingMore };
};