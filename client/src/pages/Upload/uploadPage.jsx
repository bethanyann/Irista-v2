import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import EXIF from 'exif-js';
import isEmpty from 'lodash';
import { useNavigate } from 'react-router-dom';
//context
import { AuthContext } from '../../context/authContext';
//api config
import { ADMIN_API_URL, API_KEY, API_SECRET, CLOUD_NAME } from '../../config';
//styles
import { Wrapper } from './uploadPage.styles';
import { Modal, Alert, Result, Button } from 'antd';
import uploadImage from '../../images/upload.png';
//components
import Upload from '../../components/Upload/upload';

// interface Files extends File {
//     preview: string;
// }

const UploadPage = () => {
    const { user } = useContext(AuthContext); 

    let navigate = useNavigate();
    const [ openAlertModal, setOpenAlertModal ] = useState(false);
    const [ totalFiles, setTotalFiles ] = useState(0);

    const handleConfirmModal = () => {
        //navigate to the photos page to show the latest uploaded photos on timeline? 
        setOpenAlertModal(false);
        setTotalFiles(0);
        navigate("/photos", {replace: true})
    }

    const handleCancelModal = () => {
        setOpenAlertModal(false);
        setTotalFiles(0);
    }

    //if(loading) return <div> <Spinner /> </div>;
    
    return (
        <>
        <Wrapper>
            <Upload visible={true} setTotalFiles={setTotalFiles} setOpenAlertModal={setOpenAlertModal} albumName={''}/> 
            <Modal className="ant-modal" title="" visible={openAlertModal} onCancel={handleCancelModal} footer={null}>
                <Result 
                    status="success"
                    title="Success!"
                    subTitle={totalFiles > 1 ? totalFiles + " photos successfully uploaded.": totalFiles + " photo successfully uploaded."}
                    extra={[
                        <button style={{ 
                            backgroundColor: '#CC0000',
                            color: '#fcfdff',
                            border: 'none',
                            borderRadius: '5px',
                            textTransform: 'uppercase',
                            // letterSpacing: '1px',
                            cursor: 'pointer',
                            fontSize: 'medium',
                            padding: '6px 12px'
                        }}
                        onClick={handleConfirmModal}
                        >
                             View Photos </button>,
                        <button style={{ 
                            backgroundColor: '#d4d9e8',
                            color: '#848c9e',
                            border: 'none',
                            borderRadius: '5px',
                            textTransform: 'uppercase',
                            // letterSpacing: '1px',
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
        </Wrapper>
        </>
    )
}


export default UploadPage;