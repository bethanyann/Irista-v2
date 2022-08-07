import React, { useEffect, useState } from 'react';
import { User, SearchResults } from '../models/types';

export const useSearchResultsFetch = (searchText: string, user: User) => {

    const [ searchResults, setSearchResults ] = useState<SearchResults>();
    const [ loading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage] = useState("");

    useEffect (() => {
        const fetchSearchResults = async() => {
             try {
                setIsLoading(true);
                let encodedUsername = encodeURIComponent(user.username);
                let encodedSearchText = encodeURIComponent(searchText);
    
                const results = await fetch(`/api/fetchSearchResults/${encodedUsername}/${encodedSearchText}`);
                const searchResults = await results.json();

                if(!searchResults) {
                    setErrorMessage( `No results were found that match the search term "${searchText}" `);
                } else {
                    setSearchResults(searchResults);
                }
                setIsLoading(false);
             } catch(error : any) {
                setError(true);
                setErrorMessage(error);
                setIsLoading(false);
             }
          
        }

        if(searchText)
        {
            fetchSearchResults();
        }
    }, [searchText, user]);


    return { searchResults, loading, error, errorMessage } 
};