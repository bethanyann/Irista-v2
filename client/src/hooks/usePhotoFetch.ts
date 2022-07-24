import { useState, useEffect} from 'react';
import { Photo, Photos, User  } from '../models/types';

const initialState = {
    results: [] as Photo[]
}

//need a way to store the next_cursor to determine if there are more photos to load
export const usePhotoFetch =  (user: User) => {

    const [ state, setState ] = useState(initialState);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);

    const fetchPhotos = async (user: User) => {
        try {
            setLoading(true);
            setError(false);

            const photos = await fetch(`/api/getPhotos/${user.username}`);
            const results = await photos.json();
            console.log(results);
            
            setState(results);

        } catch(error) {
            setLoading(false);
            setError(true);
            console.log(error);
        }
            
        setLoading(false);
    }

    useEffect(() => {
       
        fetchPhotos(user);
    }, [user] );

    return { state, loading, error, setIsLoadingMore };
};