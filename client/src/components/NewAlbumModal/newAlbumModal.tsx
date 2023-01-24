import React, {useState, useContext} from 'react';
import { useMutation, gql } from '@apollo/client';
//context
import { AuthContext } from '../../context/authContext';
import { User } from '../../models/types';
//styles
import { Modal, Input, Alert, Button } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import './albumModal.css';


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

    // TODO - really need to fix the AuthContext to not send back a null user so I don't have to do mess like this
    const _user = user as unknown as User;
    const username = _user.username ?? "";
    

    const [ createAlbum, {error, loading} ] = useMutation(CREATE_ALBUM, {
        variables: {
            albumInput: {
                username: username ,
                albumName: albumName,
                //coverPhotoUrl: ""
            }
        },
        update: (cache, {data: { createAlbum }}) => {

        },
        onCompleted: () => {
            console.log("succcessss!");
            
            setAlbumName('');
            onClose();
        },
        onError: (error) => {
            debugger;
            console.log(error);
            if(error.message) {
                setErrors(error.message);
            }
        }
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

    const createAlbumCallback = async (user : User) => {
        try {
            console.log(user.username, albumName);
            createAlbum();
            //does the code come back here to close everything out? 
          
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
                <Button key={"somethingelse"} className="cancel-button" onClick={onClose} disabled={loading}> Cancel </Button>,
                <Button key={"something"} className="accept-button" onClick={handleConfirmModal} loading={loading}> Create </Button>
            ]}
        >    
         <Input placeholder="Album Name" prefix={<PictureOutlined/>} value={albumName} onChange={e => handleInput(e)} />
         { errors ?  <Alert message={errors} type="error"/> : null}
        </Modal>
    );

}


export default NewAlbumModal;