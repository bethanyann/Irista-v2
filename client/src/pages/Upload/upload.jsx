import React, { useEffect, useState, useContext } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import EXIF from 'exif-js';
import isEmpty from 'lodash';
import { useNavigate } from 'react-router-dom';
//context
import { AuthContext } from '../../context/authContext';
//api config
import { ADMIN_API_URL, API_KEY, API_SECRET, CLOUD_NAME } from '../../config';
//styles
import { Wrapper, Content, UploadImage, ThumbsContainer } from './upload.styles';
import { Modal, Alert, Result, Button } from 'antd';
import uploadImage from '../../images/upload.png';

// interface Files extends File {
//     preview: string;
// }

const Upload = () => {
    const { user } = useContext(AuthContext); 
    const isUserLoggedOut = isEmpty(user);  

    let navigate = useNavigate();
    const [ files, setFiles ] = useState([]);
    const [ openModal, setOpenModal ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ totalFiles, setTotalFiles ] = useState(0);
    const [ hover, setHover ] = useState(false);


    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handleDrop = (acceptedFiles) => {
        setError('');
        const newFiles = (acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        setFiles(prev => {
            return [...prev, ...newFiles]
        });

        //TODO - handle exif data in db once photo upload is working 
        acceptedFiles.forEach(function(file) {
            if (file && file.name) {
                EXIF.getData(file, function() {
                  var exifData = EXIF.pretty(this);
                  if (exifData) {
                    //console.log(exifData);
                    let gpsLat = EXIF.getTag(this, "GPSLatitude");
                    let gpsLong = EXIF.getTag(this, "GPSLongitude");
                    if(gpsLat & gpsLong)
                    {
                        //convert https://gis.stackexchange.com/questions/136925/how-to-parse-exif-gps-information-to-lat-lng-decimal-numbers
                        const latDec = gpsLat[0] + gpsLat[1]/60 + gpsLat[2]/3600;
                        const longDec = (gpsLong[0] + gpsLong[0]/60 + gpsLat[2]/3600) * -1;
                        //use these like latDec.toFixed(6)  and longDec.toFixed(6)
                    }
                    //
                  } else {
                    console.log("No EXIF data found in image '" + file.name + "'.");
                  }
                });
              }
        })   
    }

    const handleCancelUpload = () => {
        //clear out the file array
        //remove thumbnails
        setFiles([]);
    }

    const handlePhotoUpload = () => {

        if(files.length === 0)
        {
            //set error message that no photos were selected
            setError('No photos were selected for upload');
        }
        else {
            setTotalFiles(files.length);
            const uploadedData = files.map(file => {
                
                setLoading(true);
                
                //initial FormData
                const fileName = file.name.substring(0, file.name.indexOf('.'));
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "canon_irista");
                formData.append("timestamp", (Date.now()/1000) | 0);
                formData.append("public_id", fileName);
                //formData.append("folder", `${user.username}`); 
                formData.append("context", `username=${user.username}`);
                
                //make ajax upload request using cloudinary api
                return axios.post(`https://${API_KEY}:${API_SECRET}${ADMIN_API_URL}${CLOUD_NAME}/image/upload`, formData, {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                    onUploadProgress: progressEvent => {
                                var percentCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total);
                               // console.log(progressEvent.loaded);
                              //  console.log(percentCompleted)
                            },
                   }).then( response => {
                        const data = response.data;
                        const fileUrl = data.secure_url;  //store this somewhere 
                   }).catch(err => {
                        setLoading(false);
                        setError(err.message);
                   });
            });
                
            //once all files are uploaded then
            axios.all(uploadedData).then(() => {
                setOpenModal(true);
                setLoading(false);
                setFiles([]);
            });
        }
    }

    const handleConfirmModal = () => {
        //navigate to the photos page to show the latest uploaded photos on timeline? 
        setOpenModal(false);
        setTotalFiles(0);
        navigate("/photos", {replace: true})
    }

    const handleCancelModal = () => {
        setOpenModal(false);
        setTotalFiles(0);
    }

    //if(loading) return <div> <Spinner /> </div>;
    
    return (
        <>
        <Wrapper>
            <Dropzone 
                onDrop={acceptedFiles => handleDrop(acceptedFiles)} 
                multiple={true}  
                accept={{'image/*': ['.jpeg', '.png', '.tiff', '.gif', '.heic']}}
                maxFiles={10}
                maxSize={10000000}
            >
                {({getRootProps, getInputProps}) => (
                   <section>
                    {/* root props can be applied to any element  */}
                     <Content {...getRootProps()}>

                    {/* input props can only be on an input element */}
                        <input {...getInputProps()} />  
                        <h2>Drag photos to upload here, or click to select files.</h2>

                        <h4>Photo formats .jpeg, .heic, .tiff, .gif, and .png accepted.</h4>
                        <h4 style={{marginTop: 0}}>*File size limit of 10MB due to trial cloud storage account.*</h4>
                        <UploadImage src={uploadImage} alt='upload images dropzone'/>
                    </Content>
                    <h5> Selected Photos to Upload: </h5>
                    <div className='thumb-wrapper'>
                        <ThumbsContainer>
                            { files ? files.map(file => (
                            <div className='thumb' key={file.name}>
                                <div className='thumb-inner'>
                                    <img className='thumb-image' src={file.preview} alt='thumbnail of the images to upload' onLoad={() => {URL.revokeObjectURL(file.preview)}}/>
                                </div>
                            </div>
                            )): null
                            }
                        </ThumbsContainer>
                    </div>
                    </section>
                )}
            </Dropzone>
            <div className="button-container">
               {error ?  <Alert message={error} type="error"/> : null}
                <button className='cancel-button' onClick={handleCancelUpload}> Cancel </button>
                <button className='accept-button' onClick={handlePhotoUpload}> Upload Photos </button>
            </div>

            <Modal className="ant-modal" title="" visible={openModal} onCancel={handleCancelModal} footer={null}>
                {/* <h3> {totalFiles > 1 ? totalFiles + " photos successfully uploaded.": totalFiles + " photo successfully uploaded."}</h3> */}
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
                          View Photos
                        </button>,
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

const styles = {
    
}
export default Upload;