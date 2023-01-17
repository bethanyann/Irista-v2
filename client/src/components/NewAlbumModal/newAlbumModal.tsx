import React, {useState, useContext} from 'react';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
//context
import { AuthContext } from '../../context/authContext';
import { User } from '../../models/types';
//styles
import { Modal, Input, Alert } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import './albumModal.css';

const CREATE_ALBUM  = gql`
    mutation create($albumInput: AlbumInput) {
        createAlbum(albumInput: $albumInput) {
            id,
            albumId,
            albumName,
            createdAt,
            createdBy
        }
    }
`

interface Props {
    visible: boolean;
    onClose: () => void;
}

const NewAlbumModal = ({visible, onClose} : Props) => {
    const { user } = useContext(AuthContext); 
    const [ albumName, setAlbumName ] = useState('');
    const [ errors, setErrors ] = useState('');
    const [ albumInputData, setAlbumInputData ] = useState({});


    
    const [ createAlbum, { error, loading} ] = useMutation(CREATE_ALBUM, {
        update(proxy, {data: { createAlbum: albumData}}) {
            console.log(albumData);
        }, 
        onError({graphQLErrors}) {
            debugger;
            if(graphQLErrors.length > 0 || error )
            {
                let apolloErrors = graphQLErrors[0].extensions;
                // TODO - why is this an error when it works for the photos? 
                // setErrors(apolloErrors);
                console.log(apolloErrors);
            }
        },
        variables: { albumInput: albumInputData }
    })

    const handleConfirmModal = () => {
        if(albumName === "") {
           setErrors("Please choose an album name.");
        } else {
           createAlbumCallback(user!);
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setAlbumName(event.target.value);
    }

    function createAlbumCallback(user: User) {
        let albumInput = {
            username: user.username,
            albumName: albumName
        }

        setAlbumInputData(albumInput);
        createAlbum();
    }

    return (
        <Modal
            title="Create New Album"
            onCancel={() => onClose()}
            visible={visible}
            footer={[
                <button key={"somethingelse"} className="cancel-button" onClick={onClose}>Cancel</button>,
                <button key={"something"} className="accept-button" onClick={handleConfirmModal}>Create</button>
            ]}
        >    
         <Input placeholder="Album Name" prefix={<PictureOutlined/>} value={albumName} onChange={e => handleInput(e)}/>
         { error ?  <Alert message={error} type="error"/> : null}
        </Modal>
    );

}


export default NewAlbumModal;