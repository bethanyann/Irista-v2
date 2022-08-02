import { useState, useEffect} from 'react';
import { Dictionary, groupBy } from 'lodash';
import { User, Album } from '../models/types';
const moment = require('moment');

const initialState = {
    album: [] as any,
}

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
                const albums = await fetch(`/api/getAllAlbums/${user.username}`);
                const results = await albums.json();
                debugger;
                setAlbums(results);
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