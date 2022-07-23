import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_KEY, API_SECRET, CLOUD_NAME, ADMIN_API_URL } from '../config';
import { AuthContext } from '../context/authContext';
import { Photo, Photos, User  } from '../models/types';

const initialState = {

}

//this will pull 100 photos at a time
const max_results = "&max_results=100";

//need a way to store the next_cursor to determine if there are more photos to load
export const usePhotoFetch =  (username: string) => {
    debugger;
    const [ state, setState ] = useState(initialState);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    const [ isLoadingMore, setIsLoadingMore ] = useState(false);

    const fetchPhotos = async (username: string) => {

        try {
            setLoading(true);
            setError(false);

            const endpoint = `https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?type=upload&prefix=test&max_results=100`;

            const photos = await axios.get(endpoint, {
                    headers: { 
                        "X-Requested-With": "XMLHttpRequest",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        "Access-Control-Allow_Methods" : "GET,OPTIONS,POST,PUT,DELETE,HEAD",
                    }   
                }).then( response => {
                    debugger;
                    const data = response;
                    // const fileUrl = data.secure_url;  //store this somewhere 
                    console.log(data);

                    //set state here on success
                    setState(response);
                }).catch(err => {
                    setLoading(false);
                    setError(true);
                    console.log(err);
                });
        } catch(error) {
            setLoading(false);
            setError(true);
            console.log(error);
        }

        setLoading(false);
    }

    useEffect(() => {
        //call usePhotoFetch here
        fetchPhotos(username);
    }, [username] );

    return { state, loading, error, setIsLoadingMore };
};