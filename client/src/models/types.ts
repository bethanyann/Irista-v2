
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
    total_count?: number;
}

export type Photo = {
    asset_id: string;
    public_id: string;
    format: string; //jpg, png etc
    //version: number; //unsure if i need this
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
    filename: string; //filename without the folders like in the public_id
    original_filename: string;
    image_metadata: PhotoMetadata;
    colors: [];
    tags: string[];
    isSelected: boolean;
}

export type PhotoMetadata = {
    CreateDate: string;
    DateTimeOriginal: string;
    Make: string;
    Model: string;
    Orientation: string;
    ExposureProgram: string;
    ISO: string;
    ShutterSpeedValue: string;
    ApertureValue: string;
    BrightnessValue: string;
    ExposureCompensation: string;
    MeteringMode: string;
    Flash: string;
    FocalLength: string;
    ExposureMode: string;
    WhiteBalance: string;
    LensInfo: string;
    LensMake: string;
    DateCreated: string;
}

export type Album = {
    [0]: {
        name: string;
        path: string;
    };
    [1]: { 
        secure_url: string;
    };
    coverPhoto: Photo;
}

export type SearchResults = {
    total_count: number;
    resources: Photo[];
}