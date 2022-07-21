import React, { useEffect, useState, useContext }from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import EXIF from 'exif-js';
import isEmpty from 'lodash';
//context
import { AuthContext } from '../../context/authContext';
//api config
import { ADMIN_API_URL, API_KEY, API_SECRET, CLOUD_NAME } from '../../config';
//styles
import { Wrapper, Content, UploadImage, ThumbsContainer } from './photos.styles';
import uploadImage from '../../images/upload.png';


//this will be the page that will display either the drag and drop upload with a message to start uploading photos to their new account
//or it will display by default a timeline of all of their photos in chronological order, sorted by day
const Photo = () => {
    const [files, setFiles] = useState([]);
    const { user } = useContext(AuthContext); 
    const isUserLoggedOut = isEmpty(user);  

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    const handleDrop = (acceptedFiles) => {
        console.log(acceptedFiles);

        //figure out how to aggregate files instead of overwriting the previews anytime a new photo is added 
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        //TODO - handle exif data in db once photo upload is working 
        acceptedFiles.forEach(function(file) {
            if (file && file.name) {
                EXIF.getData(file, function() {
                  var exifData = EXIF.pretty(this);
                  if (exifData) {
                    console.log(exifData);
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
       //TODO
       //DONE the upload is renaming the file and not keeping the original filename - fix
       //I want to figure out how to store the username as contextual metadata as a key/value pair on an image - is this easy to query? 
       //set up a progress bar for the upload - esp important on larger uploads
       //display a confirm modal when the upload is successful, or an error if it isn't
       //how to handle after photos are uploaded? have a 'upload more photos' or a 'see photos' that redirects to the photos page? 
        debugger;
        const uploaders = files.map(file => {
            //initial FormData
            const fileName = file.name.substring(0, file.name.indexOf('.'));
            debugger;
            const formData = new FormData();
            formData.append("file", file);
            if(!user.isEmpty) //a logged out user shouldn't ever be able to do this but just to check
            {
                formData.append("tags", `${user.username}`);
            }
            formData.append("upload_preset", "canon_irista");
            formData.append("timestamp", (Date.now()/1000) | 0);
            formData.append("public_id", fileName);
            formData.append("folder", `${user.username}`);
            
            const config = {
                onUploadProgress: progressEvent => console.log(progressEvent.loaded + " progress event "),
            }

            //make ajax upload request using cloudinary api
            return axios.post(`https://${API_KEY}:${API_SECRET}${ADMIN_API_URL}${CLOUD_NAME}/image/upload`, formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
                config
              })
                .then( response => {
                    debugger;
                    const data = response.data;
                    const fileUrl = data.secure_url;  //store this somewhere 
                    console.log(data);
                }).catch(reject => {
                    console.log(reject);
                });

        });
            
        //once all files are uploaded then
        axios.all(uploaders).then(() => {
            //perform something after upload is successful
            //display some sort of confirm that files were uploaded 
            //clean out the array
            setFiles([]);
        });
    }

    
    return (
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
                        <h4>*File size limit of 10MB/ due to trial cloud storage account.*</h4>
                        <UploadImage src={uploadImage} alt='upload images dropzone'/>
                    </Content>
                    <h5> Upload Preview: </h5>
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
            <button className='cancel-button' onClick={handleCancelUpload}> Cancel </button>
            <button className='accept-button' onClick={handlePhotoUpload}> Upload Photos </button>
            </div>
        </Wrapper>
    )
}


export default Photo;