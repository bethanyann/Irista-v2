import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
//hooks
import { useAlbumPhotoFetch } from '../../hooks/useAlbumPhotoFetch';
//styles
import { Modal, Result } from 'antd';
import { Wrapper, Header, Content, PhotoContainer, PhotoTile, PhotoImage} from './albumPhotos.styles';
import AddIcon from '../../images/icons/add.png';
import './uploadModal.css';
//components
import Upload from '../../components/Upload/upload';
//types
import { Photo, Photos } from '../../models/types';

const AlbumPhotos = () => {
    const { albumName } = useParams();   
    const formattedAlbumName = albumName!.substring(albumName!.indexOf("/") + 1);
    const [ isOpen, setIsOpen ] = useState(false);

    const [ openAlertModal, setOpenAlertModal ] = useState(false);
    const [ totalFiles, setTotalFiles ] = useState([]);

    const { photos, setPhotos, loading, error } = useAlbumPhotoFetch(albumName!);

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
        //try to get the new photos added and re-render component here
        let newArray = { } as Photos;
        if(photos)
        {
            newArray.next_cursor = photos.next_cursor;
            newArray.total_count = photos ? photos.resources.length + totalFiles.length : totalFiles.length;
            newArray.resources = [...photos?.resources, ...totalFiles];
        }
       
        setPhotos(newArray);

        console.log(photos);
        setOpenAlertModal(false);
        setIsOpen(false);
    }

    if(loading) {
        return <div> Loading photos ... </div>
    }

    return (
        <>
        <Wrapper>
            <Header>
                <h3>{formattedAlbumName}</h3>
                <img src={AddIcon} alt='add button' onClick={handleModalOpen} />
            </Header>
            <div className="divider"></div>
            <Content>
                {
                    photos && photos ? photos.resources.map((photo) => (
                        <PhotoTile key={photo.asset_id}>
                            <div className='tile-select-checkbox'>
                                <span className='tile-select-checkbox-span'>
                                    <input type='checkbox' className='checkbox' />
                                </span>
                            </div>
                            <PhotoImage src={photo.secure_url} />
                        </PhotoTile>
                    )) : null
                }
              
            </Content>
        </Wrapper>

        <Modal className="upload-modal"
            visible={isOpen} 
            // centered
            onCancel={handleModalClose}
            // footer={}
            maskClosable={false}
            width={1000}
            style={{top: 50}}
        >
           <Upload setOpenModal={setIsOpen} setOpenAlertModal={setOpenAlertModal}  setTotalFiles={setTotalFiles} albumName={albumName}/>
        </Modal>

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