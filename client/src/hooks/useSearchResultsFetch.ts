import React, { useEffect, useState } from 'react';
import { User } from '../models/types';

export const useSearchResultsFetch = (searchText: string, user: User) => {

    const [ searchResults, setSearchResults ] = useState({});
    const [ loading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage] = useState("");

    useEffect (() => {
        const fetchSearchResults = async() => {
             //call api and search
             //let encodedSearchText = encodeURIComponent(searchText);
             debugger;
             try {
                let encodedUsername = encodeURIComponent(user.username);
                let encodedSearchText = encodeURIComponent(searchText);
    
                const results = await fetch(`/api/fetchSearchResults/${encodedUsername}/${encodedSearchText}`);
                const searchResults = await results.json();
                debugger;
                console.log(searchResults);

                if(!results) {
                    setErrorMessage( `No results were found that match the search term "${searchText}" `);
                }

             } catch(error : any) {
                setError(true);
                setErrorMessage(error);
             }
          

            //console.log(searchResults);
            //clear everything out after api call
            //setSearchText('');

            //navigate to search page
        }

        if(searchText)
        {
            fetchSearchResults();
        }
    }, [searchText]);


    return { searchResults, loading, error, errorMessage } 
};