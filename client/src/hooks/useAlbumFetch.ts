import { useState, useEffect} from 'react';
import { User, Album } from '../models/types';

//need a way to store the next_cursor to determine if there are more photos to load
export const useAlbumFetch =  (user: User) => {

    const [ albums, setAlbums ] = useState<Album[]>([]);
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState(false);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);

    const fetchAlbums = async (user: User) => {
        try {
            setLoading(true);
            setErrors(false);

            if(user.username)
            {
                let encodedUsername = encodeURIComponent(user.username);
                await fetch(`/api/getAllAlbums/${encodedUsername}`).then(async(response) => {
                    if(response.ok){
                        const data = await response.json();
                        setAlbums(data);
                    } else {
                        const err = await response.json();
                        throw new Error(err.error.message);
                    }  
                }).catch(error => {
                    console.log(error);
                    setErrors(error);
                });
            }
        } catch(error) {
            setLoading(false);
            setErrors(true);
            console.log(error);
        }
            
        setLoading(false);
    }

    useEffect(() => {
        fetchAlbums(user);
    }, [user] );

    return { albums, loading, errors, setIsLoadingMore };
};