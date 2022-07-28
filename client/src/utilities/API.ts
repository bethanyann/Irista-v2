import React, { useState } from 'react';
// import { ADMIN_API_URL, API_KEY, API_SECRET, CLOUD_NAME } from '../../config';
// import axios from 'axios';
// import EXIF from 'exif-js';
// import isEmpty from 'lodash';
// import { User } from '../models/types';


// const apiSettings = {
//     postPhotoUpload: async (files: File[], user: User) => {

//         const uploadedData = files.map(file => {
                    
           
            
//             //initial FormData
    
//             const fileName = file.name.substring(0, file.name.indexOf('.'));
//             const formData = new FormData();
//             formData.append("file", file);
//             //need to add username to context
//             //formData.append("tags", `${user.username}`);
            
//             formData.append("upload_preset", "canon_irista");
//             formData.append("timestamp", (Date.now()/1000).toString());
//             formData.append("public_id", fileName);
//             formData.append("folder", `${user.username}`);  //idea for now is to just store all photos in an album under the users name, and any actual albums/subalbums under that one. 
    
            
//             //make ajax upload request using cloudinary api
//             return axios.post(`https://${API_KEY}:${API_SECRET}${ADMIN_API_URL}${CLOUD_NAME}/image/upload`, formData, {
//                 headers: { "X-Requested-With": "XMLHttpRequest" },
//                 onUploadProgress: progressEvent => {
//                             var percentCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total);
//                            // console.log(progressEvent.loaded);
//                           //  console.log(percentCompleted)
//                         },
//                }).then( response => {
//                     const data = response.data;
//                     const fileUrl = data.secure_url;  //store this somewhere 
//                    // console.log(data);
//                }).catch(err => {
//                     setLoading(false);
//                     setError(err.message);
//                    // console.log(err);
//                });
//         });
            
//         //once all files are uploaded then
//         axios.all(uploadedData).then(() => {
//             setOpenModal(true);
//             setLoading(false);
//             setFiles([]);
//         });
//     },

// }
 