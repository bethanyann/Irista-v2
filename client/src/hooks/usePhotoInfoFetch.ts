import { useState, useEffect } from 'react';
import { Photo, PhotoMetadata } from '../models/types';


export type PhotoState = Photo & { image_metadata: PhotoMetadata[] }

// const initialState = {
//     results: {} as Photo
// }

export const usePhotoInfoFetch = (photoId: string) => {
    const [ photo, setPhoto ] = useState({} as PhotoState);
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
                    
                    setPhoto(result);
                }
                else {
                    setError(true);
                }
               
            } catch(error) {
                setError(true);
                setLoading(false);
            }

            setLoading(false);
        }

        fetchPhoto();

    }, [photoId]);

    return { photo, setPhoto, loading, error }
}