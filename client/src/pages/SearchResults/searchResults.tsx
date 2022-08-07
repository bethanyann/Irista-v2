import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
//context
import { AuthContext } from '../../context/authContext';
//types
import { User } from '../../models/types';
//hooks
import { useSearchResultsFetch }  from '../../hooks/useSearchResultsFetch';
//ant
import { Space, Button, Tooltip } from 'antd';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import FolderAddOutlined from '@ant-design/icons/FolderAddOutlined';
//styles
import { Wrapper, Header } from './searchResults.styles';
//components
import PhotoGrid from '../../components/PhotoGrid/photoGrid';

const initialState = new Set<string>();

const SearchResults = () => {
    const { searchTerm } = useParams();
    const { user } = useContext(AuthContext);
    const userTest : User = user ? user : {} as User;

    const [ selectedPhotos, setSelectedPhotos] = useState(() => initialState);
    const [ isSelected, setIsSelected ] = useState(false);

    const { searchResults, loading, error, errorMessage } = useSearchResultsFetch(searchTerm!, userTest);
 

    if(loading) {
        return (
            <Wrapper>
                <Header>
                    <div>
                        <h2>Search Results for "{searchTerm}"</h2>  
                        <h3> </h3>
                    </div>
                        <Space>    </Space>
                </Header>
            <div className='divider'></div>
            <div> Loading .. .. ..</div>  
            </Wrapper>  
        )
    } 
    if (error) {
        return (
            <Wrapper>
                <Header>
                    <div>
                        <h2>Search Results for "{searchTerm}"</h2>  
                        <h3> </h3>
                    </div>
                </Header>
                <div className='divider'></div> 
                <div>{error}</div> 
            </Wrapper>
        )  
    } 
 
    return (
        <Wrapper>
            <Header>
                <div>
                    <h2>Search Results for "{searchTerm}"</h2>
                    {
                        loading ? 
                        <div> loading </div> : <h3>{searchResults?.total_count ?? 0} matching photos found </h3>
                    }
                </div>
                <div style={{marginTop:'40px'}}>
                    <Space>
                        <Tooltip title="Add to folder" placement="bottomRight">
                            <Button className="album-button" disabled={true} icon={<FolderAddOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                        </Tooltip>
                        <Tooltip title="Toggle Favorite" placement="bottomRight">
                            <Button className="album-button" disabled={true} icon={<HeartOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                        </Tooltip>
                        <Tooltip title="Download" placement="bottomRight">
                            <Button className="album-button" disabled={true} icon={<DownloadOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                        </Tooltip>
                        <Tooltip title="Delete" placement="bottom">
                            <Button className="album-button" disabled={!isSelected} onClick={() =>{}} icon={<DeleteOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                        </Tooltip>  
                    </Space>
                </div>
            </Header>
            <div className='divider'></div>
            { !loading && !error && searchResults && searchResults.total_count > 0 ? 
                
                <PhotoGrid photos={searchResults} setSelectedPhotos={setSelectedPhotos} setIsSelected={setIsSelected}/>
                 :<div> No matching photos found. </div>
            }  
           
        </Wrapper>
    )
}

export default SearchResults;