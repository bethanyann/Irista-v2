import React, { useState } from 'react';
import { Photo } from '../../models/types';

const PhotoFilename = (photo: Photo) => {

    const [ filename, setFilename ] = useState(photo.filename ?? photo.public_id ?? photo.original_filename);

}

export default PhotoFilename;