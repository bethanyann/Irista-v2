import { isCompositeType } from 'graphql';
import { useState, useEffect } from 'react';
import { Photo } from '../models/types';


//export type MovieState = Movie & { cast: Cast[], directors: Crew[]}

// const initialState = {
//     results: {} as Photo
// }

export const usePhotoInfoFetch = (photoId: string) => {
    const [ photo, setPhoto ] = useState({} as Photo);
    const [ loading, setLoading ] = useState(true); 
    const [ error, setError ] = useState(false);

    useEffect(() => {
        const fetchPhoto = async() => {
            try {
                setLoading(true);
                setError(false);
                
                if(photoId)
                {
                    const encodedPhotoId = encodeURIComponent(photoId);
                    const photo = await fetch(`/api/getPhotoInfo/${encodedPhotoId}`);
                    const result = await photo.json();
                    debugger;
                    setPhoto(result);
                }
                else {
                    setError(true);
                }
               
            } catch(error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchPhoto();

    }, [photoId]);

    return { photo, loading, error }
}