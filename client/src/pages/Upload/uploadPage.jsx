import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//styles
import { Wrapper } from './uploadPage.styles';
import { Modal, Result } from 'antd';
//components
import Upload from '../../components/Upload/upload';


const UploadPage = () => {
    let navigate = useNavigate();
    const [ openAlertModal, setOpenAlertModal ] = useState(false);
    const [ totalFiles, setTotalFiles ] = useState([]);

    const handleConfirmModal = () => {
        //navigate to the photos page to show the latest uploaded photos on timeline? 
        setOpenAlertModal(false);
        setTotalFiles([]);
        navigate("/photos", {replace: true})
    }

    const handleCancelModal = () => {
        setOpenAlertModal(false);
        setTotalFiles([]);
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
                    subTitle={totalFiles.length > 1 ? totalFiles.length + " photos successfully uploaded.": totalFiles.length + " photo successfully uploaded."}
                    extra={[
                        <button key={Math.random()} style={{ 
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
                        <button key={Math.random()}style={{ 
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