import { useState, useEffect} from 'react';
import { Photo, Photos, SortedPhotos, User  } from '../models/types';
import { Dictionary, groupBy } from 'lodash';
import { createSecureContext } from 'tls';
const moment = require('moment');

// TODO -need a way to store the next_cursor to determine if there are more photos to load
export const usePhotoTimelineFetch =  (user: User) => {

    const [ state, setState ] = useState<SortedPhotos>({});
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);
    
    const fetchPhotos = async (user: User) => {
        try {
            setLoading(true);
            setError(false);

            if(user.username)
            {
                let encodedUsername = encodeURIComponent(user.username);
                const photos = await fetch(`/api/getPhotos/${encodedUsername}`);
                const results: Photos = await photos.json();
                
                const sortedResults = groupBy(results.resources,  (photo:Photo) => { 
                    let date = moment(photo.created_at);
                    return date.format("MM-DD-YYYY");
                });
                //console.log(sortedResults);

                //pass a function to setState because the function is guaranteed to be invoked with the 
                //current & most up to date state obj
                setState(current => {
                    const photos: Dictionary<Photo[]> = { ...current.sortedPhotos, ...sortedResults };

                    return {
                        //use spread syntax to make shallow copy of previous state object
                        ...current,
                        sortedPhotos: photos,
                        next_cursor: results.next_cursor ?? "",
                        total_count: results.total_count ?? 0
                    }
                });
            }
            
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