import React, {useState, useContext} from 'react';
import { useMutation, gql } from '@apollo/client';
//context
import { AuthContext } from '../../context/authContext';
import { User } from '../../models/types';
//styles
import { Modal, Input, Alert } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import './albumModal.css';
import { isPersistedState } from './../../utilities/helpers';


interface Props {
    visible: boolean;
    onClose: () => void;
}

const CREATE_ALBUM = gql`
    mutation create($username: String!, $albumName: String!) {
        createAlbum(username: $username, albumName: $albumName) {
            id,
            albumId,
            albumName
        }
    }
`;

const NewAlbumModal = ({ visible, onClose } : Props) => {
    const { user } = useContext(AuthContext); 
    const [ albumName, setAlbumName ] = useState('');
    const [ error, setError ] = useState('');

    const handleConfirmModal = () => {
        //make fetch call here to create album 
        if(albumName === "")
        {
            setError("Please choose an album name.");
        } else {
           createAlbum(user!);
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setAlbumName(event.target.value);
    }

    const createAlbum = async (user : User) => {
        try {
            const album = await fetch(`/api/createAlbum/${user.username}/${albumName}`);
            //confirm that new album was created

            //close modal
            
        } catch(error:any) {
            setError(error);
        }
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