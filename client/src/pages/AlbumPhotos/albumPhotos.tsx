import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
//hooks
import { useAlbumPhotoFetch } from '../../hooks/useAlbumPhotoFetch';
//styles
import { Modal, Result, Space, Button, Tooltip } from 'antd';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import CloudUploadOutlined from '@ant-design/icons/CloudUploadOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import FolderAddOutlined from '@ant-design/icons/FolderAddOutlined';
import { Wrapper, Header, FullPageContainer } from './albumPhotos.styles';
import './uploadModal.css';
//components
import Upload from '../../components/Upload/upload';
import PhotoGrid from '../../components/PhotoGrid/photoGrid';
import LoadingSpinner from '../../components/Loading/spinner';
//types
import { Photos } from '../../models/types';

//TODO - this component is getting cluttered - turn some of the modals into their own components 

const initialState = new Set<string>();

const AlbumPhotos = () => {
    const { albumId } = useParams();   
    const [ isOpen, setIsOpen ] = useState(false);

    const [ openAlertModal, setOpenAlertModal ] = useState(false);
    const [ totalFiles, setTotalFiles ] = useState([]);

    const [ selectedPhotos, setSelectedPhotos] = useState(() => initialState);
    const [ isSelected, setIsSelected ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ openDeleteAlert, setOpenDeleteAlert ] = useState(false);


    //results from hook
    const { photos, setPhotos, loading, error } = useAlbumPhotoFetch(albumId!);

    const handleModalOpen = () => {
        setIsOpen(true);
    }

    const handleModalClose = () => {
        setIsOpen(false);
    }

    const handleCancelModal = () => {
        setOpenAlertModal(false);
        setTotalFiles([]);
    }

    const handleConfirmModal = () => {
        //this fires when new photos have been uploaded through the upload modal
        //and the user clicks on 'view uploaded photos'
        //it takes in the totalFiles from the upload, builds a Photos object, and appends that
        //to the photos already displayed on the page
        let newArray = { } as Photos;
        debugger;
        //will this work if there aren't any photos in the album yet?- yes?
        if(photos)
        {
            newArray.next_cursor = photos.next_cursor;
            newArray.total_count = photos ? photos.resources.length + totalFiles.length : totalFiles.length;
            newArray.resources = [...photos?.resources, ...totalFiles];
        } 
       
        setPhotos(newArray);
        setOpenAlertModal(false);
        setIsOpen(false);
    }

    const handleDeletePhotos = async () => {
        setIsLoading(true);

        if(selectedPhotos.size > 0){
  
            let selectedPhotoArr = Array.from(selectedPhotos);

            await fetch(`/api/deletePhotos`, {
                method: 'POST',
                body: JSON.stringify(selectedPhotoArr),
                headers: {
                    'Content-type':'application/json; charset=UTF-8'
                }
            }).then(data => {
                let newArray = { } as Photos;
                newArray.resources = photos!.resources.filter(photo => !selectedPhotoArr.find(em => (em === photo.public_id)));
                
                setPhotos(newArray);
                setSelectedPhotos(initialState);
                setIsSelected(false);
                setIsLoading(false);
                setOpenDeleteAlert(false);
            }).catch(error => {
                console.log(error);
                setIsLoading(false);
            });
          
        }
        else {
            console.log(selectedPhotos);
        }
    }
    if(loading) {
        return (
            <FullPageContainer>
                <LoadingSpinner title="Loading Photos" />
            </FullPageContainer>
        )
    } 
    return (
        <>
        <Wrapper>
            <Header>
                <h3>{albumId}</h3>
                <div>
                    <Space>
                        {
                            <>
                                <Tooltip title="Add to folder" placement="bottomRight">
                                    <Button className="album-button" disabled={true} icon={<FolderAddOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                                </Tooltip>
                                <Tooltip title="Toggle Favorite" placement="bottomRight">
                                    <Button className="album-button" disabled={true} icon={<HeartOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                                </Tooltip>
                                <Tooltip title="Upload Images" placement="bottomRight">
                                    <Button className="album-button"  onClick={() => handleModalOpen()} icon={<CloudUploadOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                                </Tooltip>
                                <Tooltip title="Download" placement="bottomRight">
                                    <Button className="album-button" disabled={true} icon={<DownloadOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                                </Tooltip>
                                <Tooltip title="Delete" placement="bottom">
                                    <Button className="album-button" disabled={!isSelected} onClick={() => setOpenDeleteAlert(true)} icon={<DeleteOutlined className="album-button" style={{fontSize:'1.3em'}}/>} size="large"/>
                                </Tooltip>
                            </>
                        }     
                    </Space>
                </div>
            </Header>
            <div className="divider"></div>
           <PhotoGrid photos={photos} setSelectedPhotos={setSelectedPhotos} setIsSelected={setIsSelected} /> 
        </Wrapper>

        <Modal className="ant-modal" title="Delete" width={600} visible={openDeleteAlert} onCancel={() => setOpenDeleteAlert(false)} footer={null}>
            <Result
                status="warning"
                title={`Delete ${selectedPhotos.size} photo${selectedPhotos.size > 1 ? 's' : ''} from your account?` }
                subTitle="This is a permanent delete and the files will not be recoverable!"
                extra={[
                    <Button key={5678}
                        className="cancel-button"
                        onClick={() => setOpenDeleteAlert(false)}
                        disabled={isLoading}
                    > Cancel</Button>,
                    <Button key={1234} 
                        className="accept-button"
                        loading={isLoading}
                        onClick={handleDeletePhotos}
                    >{loading ? "Deleting..." : "Delete Photos"}</Button>
                ]}
           />    
        </Modal>
        <Modal className="upload-modal"
            visible={isOpen} 
            onCancel={handleModalClose}
            maskClosable={false}
            width={1000}
            style={{top: 50}}
        >
           <Upload setOpenModal={setIsOpen} setOpenAlertModal={setOpenAlertModal}  setTotalFiles={setTotalFiles} albumName={albumId}/>
        </Modal>
    {/* TODO - turn these success and failure modals into their own component  */}
        <Modal className="ant-modal" title="" visible={openAlertModal} onCancel={handleCancelModal} footer={null}>
                <Result 
                    status="success"
                    title="Success!"
                    subTitle={totalFiles.length > 1 ? totalFiles.length + " photos successfully uploaded.": totalFiles.length + " photo successfully uploaded."}
                    extra={[
                        <button key={1234} style={{ 
                            backgroundColor: '#CC0000',
                            color: '#fcfdff',
                            border: 'none',
                            borderRadius: '5px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            fontSize: 'medium',
                            padding: '6px 12px'
                        }}
                        onClick={handleConfirmModal}
                        >
                             View Photos </button>,
                        <button key={5678} style={{ 
                            backgroundColor: '#d4d9e8',
                            color: '#848c9e',
                            border: 'none',
                            borderRadius: '5px',
                            textTransform: 'uppercase',
                          
                            cursor: 'pointer',
                            fontSize: 'medium',
                            padding: '6px 12px'
                        }}
                        onClick={handleCancelModal}
                        > 
                            Upload More Photos</button>,
                    ]}
                />
            </Modal>
        </>
      
    )
}

export default AlbumPhotos;