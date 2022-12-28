import { useState, useEffect} from 'react';
import { Photo, Photos, SortedPhotos, User  } from '../models/types';
import { Dictionary, groupBy, merge } from 'lodash';
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
                
                let sortedResults = groupBy(results.resources,  (photo:Photo) => { 
                    let date = moment(photo.created_at);
                    return date.format("MM-DD-YYYY");
                });
                //if loading more photos, need to merge the existing state with new photos
                if(isLoadingMore) {
                    //make deep copy of current state photo object
                    let existingPhotos = JSON.parse(JSON.stringify(state.sortedPhotos));

                    //sortedResults is prev, existingPhotos is current
                    let combinedPhotos = [sortedResults, existingPhotos].reduce((prev, current) => {
                        Object.keys(current).forEach((key) => {
                            
                            // does this combine keys or just overwrite? it just overwrites hoookay
                            if(key in sortedResults)
                            {// this feels super gross but lets see if it works. 
                                current[key].forEach((photo: Photo) => {
                                    prev[key].push(photo);
                                });
                            }
                            else {
                                prev[key] = current[key];
                            }
                            debugger;
                        });
                    })
                    // Object.keys(existingPhotos).forEach(key => 
                    // {
                    //    // see if key in existing photos is in the new returned 
                    //     if(key in sortedResults)
                    //     {
                    //         //if the key already exists, append the sorted results to the existingPhotos array
                    //         sortedResults[key].forEach((photo) => {
                    //             existingPhotos[key].push(photo);
                    //         })
                    //     } 
                    // });

                    setState((prevData) => {
                        return {
                            // ...prevData, 
                            sortedPhotos: existingPhotos,
                            next_cursor: results.next_cursor,
                            total_count: results.total_count
                        }
                    });

                    setIsLoadingMore(false);
                } 

                //see if sortedResults has the aggregated "load more" data here 
                setState((prevData) => {
                    return {
                        ...prevData, 
                        sortedPhotos: sortedResults,
                        next_cursor: results.next_cursor,
                        total_count: results.total_count
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
        // const sessionState = isPersistedState('timelineState');
        // if(sessionState) {
        //     console.log('grabbing from session storage');
        //     setState(sessionState);
        //     return;
        // }
       
        console.log('grabbing from api');
        //wipe out state before loading 
        setState({});
        fetchPhotos(user);

    }, [ user ]);


    // //I think only run this one if its loading more and not just on any render? and then have a separate one that runs on initial render to check for session storage?
    useEffect(() => {
        if(!isLoadingMore) return;

        console.log('grabbing from isLoadingMore hook')
        fetchPhotos(user);
        //set back to false once the fetch has completed
        setIsLoadingMore(false);
    }, [ user, isLoadingMore ]);

    //write to session storage when the state changes
    // useEffect(() => {
    //     sessionStorage.setItem('timelineState', JSON.stringify(state));  //can only write a string to session storage
    // }, [state]);

    return { state, loading, error, setIsLoadingMore };
};