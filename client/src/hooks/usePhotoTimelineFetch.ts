import { useState, useEffect} from 'react';
import { Photo, Photos, SortedPhotos, User  } from '../models/types';
import { Dictionary, groupBy } from 'lodash';
import moment from 'moment';

import { isPersistedState } from '../utilities/helpers';


export const usePhotoTimelineFetch =  (user: User) => {
    const [ state, setState ] = useState<SortedPhotos>({});
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);
    
    const fetchPhotos = async (user: User) => {
        try {
            setLoading(true);
            setError(false);

            if(user.username) {
                let nextCursor = state.next_cursor ? encodeURIComponent(state.next_cursor): "";
                let encodedUsername = encodeURIComponent(user.username);
              
                let endpoint: string = nextCursor ? `/api/getPhotos/${encodedUsername}/${nextCursor}` : `/api/getPhotos/${encodedUsername}`
                const photos = await fetch(endpoint);
                const results: Photos = await photos.json();
                
                const sortedResults = groupBy(results.resources,  (photo:Photo) => { 
                    let date = moment(photo.created_at);
                    return date.format("MM-DD-YYYY");
                });

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

    //run this hook on intial render
    useEffect(() => {
        const sessionState = isPersistedState('timelineState');

        // if(sessionState) {
        //     console.log('grabbing from session storage');
        //     setState(sessionState);
        //     return;
        // }
       
        console.log('grabbing from api');
        //TODO create an initial state to use here? 
        //wipe out state before loading 
        setState({});
        fetchPhotos(user);
        
    }, [user]);


    //I think only run this one if its loading more and not just on any render? and then have a separate one that runs on initial render to check for session storage?
    useEffect(() => {
        fetchPhotos(user);
        //set back to false once the fetch has completed
        setIsLoadingMore(false);
    }, [ user, isLoadingMore ]);

    //write to session storage when the state changes
    useEffect(() => {
        sessionStorage.setItem('timelineState', JSON.stringify(state));  //can only write a string to session storage
    }, [state]);

    return { state, loading, error, setIsLoadingMore };
};