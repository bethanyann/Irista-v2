import { useContext, useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { Alert, Button } from 'antd';
import axios from 'axios';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import EXIF from 'exif-js';
//context
import { AuthContext } from '../../context/authContext';
//styles
import {Wrapper, Content, UploadImage, ThumbsContainer } from './upload.styles';
import DropzoneImage from '../../images/upload.png';
import { ExclamationCircleFilled, FileUnknownFilled } from '@ant-design/icons';
import { mapPhotoData } from '../../utilities/helpers';

const CREATE_PHOTO = gql`
    mutation create($photoInput: PhotoInput) {
        createPhoto(photoInput: $photoInput) {
            filename
            longitude
            latitude
            isFavorite
        }
    }
`;

const Upload = ({setOpenModal, setOpenAlertModal, setTotalFiles, albumName }) => {
    const { user } = useContext(AuthContext); 

    const [ files, setFiles ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ fileErrors, setFileErrors ] = useState([]);
    const [ photoInputData, setPhotoInputData ] = useState({});

    
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const [ createPhoto, {errors, loadingData} ] = useMutation(CREATE_PHOTO, {
        update(proxy, {data: {createPhoto: photoData}}){
            console.log(photoData);
        },
        onError({graphQLErrors}) {
            debugger;
            if(graphQLErrors.length > 0 || errors )
            {
                let apolloErrors = graphQLErrors[0].extensions;
                setError(apolloErrors);
                console.log(apolloErrors);
            }
        },
        variables: { photoInput: photoInputData }     
    });


    const handleDeletePhoto = (filename) => { 
        setFiles(files.filter(f => f.path !== filename));
    }

    const handleCancelUpload = () => {
        setFiles([]);
        setLoading(false);
        setError('');
        setFileErrors([]);
        if(setOpenModal)
        {
            setOpenModal(false);
        }
    }

    const handleDrop = (acceptedFiles, rejectedFiles) => {
        debugger;
        setFileErrors([]);
        setError('');
        if(rejectedFiles.length > 0)
        {
            let errorList = [];
            //TODO maybe do something here to at least upload the first 15 photos and then tell the user that the # of the rest of the photos couldn't be uploaded? 
            if(rejectedFiles[0].errors[0].code === "too-many-files") {
                errorList.push("Files could not be uploaded. File upload is limited to 15 photos at a time.");
                
                //if I set accepted files here could I get it to still upload the first 15 files and display an error? 
                setFileErrors(errorList);
            } else {
                rejectedFiles.forEach(err => {
                    errorList.push([
                        err.file.path,
                        err.errors[0].message
                    ]);
                });  
                setFileErrors(errorList);
           }
        }    
        if(acceptedFiles.length > 0) 
        {       
            const newFiles = (acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file),
            })));
          
            newFiles.forEach((file) => {
                //see if file exists in file array already to prevent duplicates
                let fileExists = files.find(f => f.path === file.path && f.size === file.size);
                if(!fileExists)
                {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    //this is an async function that runs after the reader is done loading the file
                    reader.onloadend = () => { 
                       Object.assign(file, {
                            fileString: reader.result
                        })

                        setFiles(prev => {
                            return [...prev, file]
                        })
                    }
                }
            });
            //TODO - handle exif data in db once photo upload is working 
            // acceptedFiles.forEach(function(file) {
            //     if (file && file.name) {
            //         EXIF.getData(file, function() {
            //         var exifData = EXIF.pretty(this);
            //         if (exifData) {
            //             //console.log(exifData);
            //             let gpsLat = EXIF.getTag(this, "GPSLatitude");
            //             let gpsLong = EXIF.getTag(this, "GPSLongitude");
            //             if(gpsLat & gpsLong)
            //             {
            //                 //convert https://gis.stackexchange.com/questions/136925/how-to-parse-exif-gps-information-to-lat-lng-decimal-numbers
            //                 const latDec = gpsLat[0] + gpsLat[1]/60 + gpsLat[2]/3600;
            //                 const longDec = (gpsLong[0] + gpsLong[0]/60 + gpsLat[2]/3600) * -1;
            //                 //use these like latDec.toFixed(6)  and longDec.toFixed(6)
            //             }
            //             //
            //         } else {
            //             console.log("No EXIF data found in image '" + file.name + "'.");
            //         }
            //         });
            //     }
            // })  
        }
    }

    const handlePhotoUpload = () => {
        let uploadedPhotoList = [];

        if(files.length === 0) {
            setError('No photos were selected for upload');
        }
        else {
            setLoading(true);

            const uploadedData = files.map( async (file) => {
                try{
                    //encode variables in case any of them have weird characters
                    let username = encodeURIComponent(user.username);
                    let filename = encodeURIComponent(file.name.substring(0, file.name.indexOf('.')));
                    let albumname = encodeURIComponent(albumName);
                  
                    //api best practices state to use two different endpoints for cases like this instead of implementing logic on the backend
                    const url = albumname ? `/api/uploadPhotos/${username}/${filename}/${albumname}`  : `/api/uploadPhotos/${username}/${filename}`;

                    return axios.post(url, {data: file.fileString}).then(response => {
                        uploadedPhotoList = [...uploadedPhotoList, response.data];
                        //after the photo is successfully uploaded to cloudinary, add photo info to db
                        //TODO - add in all of the photo data and EXIF json string 
                        createPhotoCallback(response.data);
                    }).catch(error => {
                        setLoading(false);
                        setError("api error: " + error.message);
                    })
                } catch(error) {
                    setError("internal error" + error);
                }
            })

            axios.all(uploadedData).then(() => {
                if(!error)
                {
                    if(setOpenAlertModal) {
                        setOpenAlertModal(true);
                    }
                    if(setTotalFiles) {
                        setTotalFiles(uploadedPhotoList);
                    }
                }
                setLoading(false);
                setFiles([]);
            }).catch(error => {
                console.log(error);
                console.log('axios error');
            });
        }
    }

    function createPhotoCallback(uploadedPhoto) {
        // make the preview url here
        debugger;
        // TODO - add the new properties here and see if they save to MongoDB
        let photoData = mapPhotoData(uploadedPhoto, user.username);
        

        setPhotoInputData(photoData);
        createPhoto();
    }

    return(
        <Wrapper>
            <Dropzone 
                onDrop={(acceptedFiles, rejectedFiles) => handleDrop(acceptedFiles, rejectedFiles)} 
                multiple={true}  
                accept={{'image/*': ['.jpeg', '.png', '.tiff', '.gif', '.heic']}}
                maxFiles={15}
                maxSize={10485760}
                disabled={loading}
            >
                {({getRootProps, getInputProps}) => (
                   <section>
                    {/* root props can be applied to any element  */}
                     <Content {...getRootProps()}>

                    {/* input props can only be on an input element */}
                        <input {...getInputProps()} />  
                        <h2>Drag photos to upload here, or click to select files.</h2>
                        <h4>Photo formats .jpeg, .tiff, .gif, and .png accepted.</h4>
                        <h4 style={{marginTop: 0}}>*Individual file size limit of 10MB due to trial cloud storage account.*</h4>
                        <UploadImage src={DropzoneImage} alt='upload images dropzone'/>
                    </Content>
                    <h5> Selected Photos to Upload: </h5>
                    <div className='thumb-wrapper'>
                        <ThumbsContainer>
                            { files ? files.map(file => (
                            <div className='thumb' key={file.name}>
                                <div className="remove-checkbox">
                                    <div className="remove-checkbox-span">
                                        <div className="checkbox" onClick={() => handleDeletePhoto(file.name)}>X</div>
                                    </div>
                                </div>
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
            <p className="error-list">
                { fileErrors.length > 0 ? <span className="error-icon"><ExclamationCircleFilled /></span> : null}
                {
                    fileErrors && fileErrors.length > 1 ? 
                    fileErrors.map(error => (
                         `File ${error[0]} could not be uploaded. ${error[1]}.  `
                     ))
                    : fileErrors.length === 1 ? fileErrors[0] :null
                } 
            </p>
            <div className="button-container">
               {error ? <Alert style={{marginRight:'20px'}} message={error} type="error"/> : null}
                <Button className='cancel-button'  onClick={handleCancelUpload} disabled={loading}> Cancel </Button>
                <Button className='accept-button' onClick={handlePhotoUpload} loading={loading}>{loading ? "Uploading..." : "Upload Photos"}</Button>
            </div>
        </Wrapper>

    )

}

export default Upload;