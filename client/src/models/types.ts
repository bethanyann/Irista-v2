
export type User = {
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    token: string;
}

export type Photos = {
    resources: Photo[];
    next_cursor: string;
}

export type Photo = {
    asset_id: string;
    public_id: string;
    format: string; //jpg, png etc
    version: number; //unsure if i need this
    resource_type: string; //image, video
    type: string; //upload
    created_at: Date;
    bytes: number; //filesize like 561999
    width: number; //pixel dimension like 1200
    height: number; //pixel dimension like 1800
    folder: string; 
    access_mode: string; //authenticated
    url: string //url of photo in cloudinary
    secure_url: string; //another url of photo in cloudinary
    original_filename: string; //filename without the folders like in the public_id
    image_metadata: PhotoMetadata;
    colors: PhotoColors;
    tags: string[];
}

export type PhotoMetadata = {
    createData: string;
    dateTimeOriginal: string;
    make: string;
    model: string;
    orientation: string;
    exposureProgram: string;
    iso: string;
    exifVersion: string;
    shutterSpeedValue: string;
    apertureValue: string;
    brightnessValue: string;
    exposureCompensation: string;
    meteringMode: string;
    flash: string;
    focalLength: string;
    exposureMode: string;
    whiteBalance: string;
    lensInfo: string;
    lensMake: string;
    dateCreated: string;
}

export type PhotoColors = {
    colorPair: [];
}