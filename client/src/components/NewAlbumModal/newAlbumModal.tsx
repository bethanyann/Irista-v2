import React, {useState, useContext} from 'react';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
//context
import { AuthContext } from '../../context/authContext';
import { User } from '../../models/types';
//styles
import { Modal, Input, Alert, Button } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import './albumModal.css';

const CREATE_ALBUM = gql`
    mutation create( $albumInput: AlbumInput ) {
        createAlbum( albumInput: $albumInput ) {
            id,
            albumName
        }
    }
`
interface Props {
    visible: boolean;
    onClose: () => void;
}

const initialState = {
    username: "",
    albumName: ""
}

const NewAlbumModal = ({visible, onClose} : Props) => {
    const { user } = useContext(AuthContext); 
    const [ albumName, setAlbumName ] = useState('');
    const [ errors, setErrors ] = useState('');
    const [ albumInputData, setAlbumInputData ] = useState(initialState);
    
    const [ createAlbum, { error, loading } ] = useMutation(CREATE_ALBUM, {
        onCompleted(data){
            console.log(data);
        },
        onError({graphQLErrors}) {
            if(graphQLErrors.length > 0 || error )
            {
                debugger;
                let apolloErrors = graphQLErrors[0].extensions;
                // TODO - why is this an error when it works for the photos? 
                // setErrors(apolloErrors);
                console.log("apollo errors: " + apolloErrors);
            }
        },
        variables: { albumInput: albumInputData }
    });

    const handleConfirmModal = () => {
        debugger;
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
        // let albumData = {
        //     username: user.username,
        //     albumName: albumName,
        // }

        setAlbumInputData({ username: user.username, albumName: albumName });
        console.log(albumInputData);
        createAlbum();
    }

    return (
        <Modal
            title="Create New Album"
            onCancel={() => onClose()}
            visible={visible}
            footer={[
                <Button key={"CancelButton"} className="cancel-button" onClick={onClose}>Cancel</Button>,
                <Button key={"CreateButton"} className="accept-button" onClick={handleConfirmModal} loading={loading}>Create</Button>
            ]}
        >    
         <Input placeholder="Album Name" min={1} max={25} maxLength={25} prefix={<PictureOutlined/>} value={albumName} onChange={e => handleInput(e)}/>
         { error || errors ?  <Alert message={error ?? errors} type="error"/> : null}
        </Modal>
    );

}


export default NewAlbumModal;