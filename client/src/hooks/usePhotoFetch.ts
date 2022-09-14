import { useState, useEffect} from 'react';
import { Photo, Photos, User  } from '../models/types';
import { Dictionary, groupBy } from 'lodash';
const moment = require('moment');

const initialState = {
    resources: [] as Photo[],
    next_cursor: ''
}

//need a way to store the next_cursor to determine if there are more photos to load
export const usePhotoFetch =  (user: User) => {

    const [ state, setState ] = useState<Dictionary<any[]>>();
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
                const results = await photos.json();

                //should have something like results.results and results.next_cursor or something like that 
                const nextCursor = results.next_cursor ?? null;
                const resources = results.resources ?? null; 
                const totalCount = results.total_count ?? null; //idk if i will use this yet but here it is

                const sortedResults = groupBy(resources,  (photo:any) => { 
                    let date = moment(photo.created_at);
                    return date.format("MM-DD-YYYY");
                });
              
                setState(sortedResults);
            }
           

        } catch(error) {
            // debugger;
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