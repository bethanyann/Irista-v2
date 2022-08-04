import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
//hooks
import { useAlbumPhotoFetch } from '../../hooks/useAlbumPhotoFetch';
//styles
import { Modal, Result } from 'antd';
import { Wrapper, Header, Content, PhotoContainer, PhotoTile, PhotoImage} from './albumPhotos.styles';
import AddIcon from '../../images/icons/add.png';
import DeleteIcon from '../../images/icons/delete.png';
import './uploadModal.css';
//components
import Upload from '../../components/Upload/upload';
import PhotoInfo from '../PhotoInfo/photoInfo';
//types
import { Photo, Photos } from '../../models/types';

//TODO - this component is getting cluttered - turn some of the modals into their own components 

const initialState = new Set<string>();

const AlbumPhotos = () => {
    const { albumName } = useParams();   
    const formattedAlbumName = albumName!.substring(albumName!.indexOf("/") + 1);
    const [ isOpen, setIsOpen ] = useState(false);

    const [ openAlertModal, setOpenAlertModal ] = useState(false);
    const [ totalFiles, setTotalFiles ] = useState([]);

    const [ selectedPhotos, setSelectedPhotos] = useState(() => initialState);

    const [ activePhotoId, setActivePhotoId ] = useState('');
    const [ isPhotoModalOpen, setIsPhotoModalOpen ] = useState(false);
    const [ openDeleteAlert, setOpenDeleteAlert ] = useState(false);


    //results from hook
    const { photos, setPhotos, loading, error } = useAlbumPhotoFetch(albumName!);
    console.log(photos);

    const handlePhotoModalOpen = (photoId : string) => {
        setActivePhotoId(photoId);
        setIsPhotoModalOpen(true);
    }

    const handlePhotoModalClose = () => {
        setIsPhotoModalOpen(false);
        setActivePhotoId('');
    }

    const handleModalOpen = () => {
        setSelectedPhotos(initialState);
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
        debugger;
        let newArray = { } as Photos;
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

    const handleSelectPhoto = (event: any, photo: Photo) => {
        if(event.target.checked){
            //add photo id to set
            photo.isSelected = true;
            setSelectedPhotos(prev => new Set(prev).add(photo.public_id));

        } else {
            //delete photo from set
            photo.isSelected = false;
            setSelectedPhotos(prev => {
                const next = new Set(prev);
                next.delete(photo.public_id);
                return next;
            })
        }
    }

    const handleDeletePhotos = async () => {
        //show confirm delete modal
        //if yes ->
        //take set of selected photos
        if(selectedPhotos.size > 0){
            
            console.log(selectedPhotos);
            let selectedPhotoArr = Array.from(selectedPhotos);

            await fetch(`/api/deletePhotos`, {
                method: 'POST',
                body: JSON.stringify(selectedPhotoArr),
                headers: {
                    'Content-type':'application/json; charset=UTF-8'
                }
            }).then(data => {
                console.log(data);
                let newArray = { } as Photos;
               
                newArray.resources = photos!.resources.filter(photo => !selectedPhotoArr.find(em => (em === photo.public_id)));
                
                //close modal
                setOpenDeleteAlert(false);
                //set photo state to new array 
                setPhotos(newArray);
                //setSelectedPhoto array to []
                setSelectedPhotos(initialState);
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            //return error that no photos are selected for deletion
            console.log(selectedPhotos);
        }
    }

    //TODO - loading needs some styling help, its displaying in the top left of the page
    //could use a spinner or some simple animation too 
    if(loading) {
        return <div> Loading photos ... </div>
    }

    return (
        <>
        <Wrapper>
            <Header>
                <h3>{formattedAlbumName}</h3>
                <div>
                    <img src={DeleteIcon} alt='delete button' onClick={() => setOpenDeleteAlert(true)} style={{marginRight:'20px', height: '30px'}}/>
                    <img src={AddIcon} alt='add button' onClick={handleModalOpen} />
                </div>
            </Header>
            <div className="divider"></div>
            <Content>
                {
                    photos && photos ? photos.resources.map((photo) => (
                        <PhotoContainer  key={photo.asset_id}>
                            <PhotoTile className='photo-tile' style={photo.isSelected ? {backgroundColor:'#f3f4fa', border:'1px solid var(--smoke)'} : { }}>
                                <div className='tile-select-checkbox'>
                                    <span className='tile-select-checkbox-span'>
                                        <input type='checkbox' className='checkbox' checked={photo.isSelected ?? false} onChange={event => handleSelectPhoto(event, photo)}/>
                                    </span>
                                </div>
                                <div className='photo-image-wrapper' style={{zIndex:1}} onClick={() => handlePhotoModalOpen(photo.public_id)}>
                                    <PhotoImage src={photo.secure_url} style={photo.isSelected? {maxHeight:'290px', maxWidth:'290px'} : {}} />
                                </div>       
                            </PhotoTile>
                            <p>{(photo.filename ?? photo.original_filename ?? photo.public_id.substring(0, photo.public_id.lastIndexOf('/') + 1)) + "." + photo.format}</p>
                        </PhotoContainer>
                    )) : null
                }
            </Content>
            <PhotoInfo visible={isPhotoModalOpen} photoId={activePhotoId} onClose={handlePhotoModalClose} /> 
        </Wrapper>



        <Modal className="ant-modal" title="" width={600} visible={openDeleteAlert} onCancel={() => setOpenDeleteAlert(false)} footer={null}>
            <Result
                status="warning"
                title={`Delete ${selectedPhotos.size} photo${selectedPhotos.size > 1 ? 's' : ''} from your account?` }
                subTitle="This is a permanent delete and the files will not be recoverable!"
                extra={[
                   
                    <button key={5678} style={{ 
                        backgroundColor: '#d4d9e8',
                        color: '#848c9e',
                        border: 'none',
                        borderRadius: '5px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        fontSize: 'medium',
                        padding: '6px 12px',
                        marginRight: '40px',
                        marginTop:'40px'
                        }}
                        onClick={() => setOpenDeleteAlert(false)}
                    > Cancel</button>,
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
                        onClick={handleDeletePhotos}
                    > Delete</button>
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

    // const confirmButtonStyle = {
    //     backgroundColor: '#CC0000',
    //     color: '#fcfdff',
    //     border: 'none',
    //     borderRadius: '5px',
    //     textTransform: 'uppercase',
    //     cursor: 'pointer',
    //     fontSize: 'medium',
    //     padding: '6px 12px'
    // }
}

export default AlbumPhotos;