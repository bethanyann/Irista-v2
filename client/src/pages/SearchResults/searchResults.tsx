import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
//context
import { AuthContext } from '../../context/authContext';
//types
import { User } from '../../models/types';
//hooks
import { useSearchResultsFetch }  from '../../hooks/useSearchResultsFetch';
//styles
import { Wrapper, Content } from './searchResults.styles';


const SearchResults = () => {
    const { searchTerm } = useParams();
    const { user, logout } = useContext(AuthContext);
    const userTest : User = user ? user : {} as User;
    debugger;
    const { searchResults, loading, error } = useSearchResultsFetch(searchTerm!, userTest);
   
   
    return (
        <Wrapper>
            <h2>Search Results</h2>
            <div className='divider'></div>

            <Content>

            </Content>
        </Wrapper>
    )
}

export default SearchResults;