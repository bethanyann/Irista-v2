
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
}