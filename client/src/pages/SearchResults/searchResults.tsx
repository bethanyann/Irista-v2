import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
//context
import { AuthContext } from '../../context/authContext';
//types
import { User } from '../../models/types';
//hooks
import { useSearchResultsFetch }  from '../../hooks/useSearchResultsFetch';
//styles
import { Wrapper } from './searchResults.styles';
//components
import PhotoGrid from '../../components/PhotoGrid/photoGrid';


const SearchResults = () => {
    const { searchTerm } = useParams();
    const { user } = useContext(AuthContext);
    const userTest : User = user ? user : {} as User;
    const { searchResults, loading, error, errorMessage } = useSearchResultsFetch(searchTerm!, userTest);
 
    return (
        <Wrapper>
            <h2>Search Results for "{searchTerm}"</h2>
            <h3>{searchResults?.total_count ?? 0} matching photos found.</h3>
            <div className='divider'></div>
            { loading ? <div>Loading .. .. .. </div> : null } 
            { error || errorMessage !== '' ?  <div></div> : null}
            { searchResults && searchResults.total_count > 0 ? 
                 <PhotoGrid photos={searchResults}/>
                 :<div> No matching photos found. </div>
            }  
           
        </Wrapper>
    )
}

export default SearchResults;