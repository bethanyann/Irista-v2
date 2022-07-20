import React, { useEffect, useState }from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import EXIF from 'exif-js';
//styles
import { Wrapper, Content, UploadImage, ThumbsContainer } from './photos.styles';
import uploadImage from '../../images/upload.png';


//this will be the page that will display either the drag and drop upload with a message to start uploading photos to their new account
//or it will display by default a timeline of all of their photos in chronological order, sorted by day
const Photo = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handleDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        debugger;

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
                    console.log(EXIF.getTag(this, "GPSLatitude"));
                    console.log(EXIF.getTag(this, "GPSLongitude"));
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
        //ok here we go
        //files should have all the images in it atm
        const uploaders = files.map(file => {
            
        })
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