import { useState, useEffect} from 'react';
import { Photo, Photos, User  } from '../models/types';
import { Dictionary, groupBy } from 'lodash';
const moment = require('moment');

// type AlbumPhotos = {
//     resources: Photo[],    
// }

//need a way to store the next_cursor to determine if there are more photos to load
export const useAlbumPhotoFetch =  (albumName:string) => {

    const [ photos, setPhotos ] = useState<Photos>();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);

    const fetchPhotos = async (albumName: string) => {
        try {
            debugger;
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
        fetchPhotos(albumName);
    }, [albumName, setPhotos] );

    return { photos, setPhotos, loading, error, setIsLoadingMore };
};