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
    mutation create($albumInput: AlbumInput) {
        createAlbum(albumInput: $albumInput) {
            id,
            albumId,
            albumName
        }
    }
`;

const NewAlbumModal = ({ visible, onClose } : Props) => {
    const { user } = useContext(AuthContext); 
    const [ albumName, setAlbumName ] = useState('');
    const [ errors, setErrors ] = useState('');
    const [ albumInfo, setAlbumInfo ] = useState({
        username: '',
        albumName: ''
    });
    
    const _user = user as unknown as User;
    const username = _user.username ?? "";
    

    const [ createAlbum, {error, loading} ] = useMutation(CREATE_ALBUM, {
        variables: {
            albumInput: {
                username: username ,
                albumName: albumName,
            }
        },
        update: (cache, {data: { createAlbum }}) => {

        },
        onCompleted: () => {
            console.log("succcessss!");

            // setAlbumName('');
            // onClose();
        },
        onError: (error) => {
            debugger;
            console.log(error);
        }
    })

    const handleConfirmModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //make fetch call here to create album 
        e.preventDefault();
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

    const createAlbumCallback = async (user : User) => {
        try {
            //const album = await fetch(`/api/createAlbum/${user.username}/${albumName}`);
            //confirm that new album was created
            console.log(user.username, albumName);
            //close modal
            createAlbum();
            
        } catch(error:any) {
            setErrors(error);
        }
    }


    return (
        <Modal
            title="Create New Album"
            onCancel={() => onClose()}
            visible={visible}
            footer={[
                <button key={"somethingelse"} className="cancel-button" onClick={onClose}>Cancel</button>,
                <button key={"something"} className="accept-button" onClick={(e) => handleConfirmModal(e)}>Create</button>
            ]}
        >    
         <Input placeholder="Album Name" prefix={<PictureOutlined/>} value={albumName} onChange={e => handleInput(e)}/>
         { errors ?  <Alert message={errors} type="error"/> : null}
        </Modal>
    );

}


export default NewAlbumModal;