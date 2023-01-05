import { Photo } from "../models/types";
import { buildUrl, extractPublicId } from 'cloudinary-build-url';

//use for session storage
export const isPersistedState = (stateName: string) : any => {
    //gets item from session storage with the name that is passed in
    const sessionState = sessionStorage.getItem(stateName.toString());
    return sessionState && JSON.parse(sessionState);
}

//used to map uploaded photo data with the object shape that GraphQL needs
export const mapPhotoData = ( photo: Photo, username: string) => {
    return  {
        photoId: photo.public_id,
        filename: photo.public_id,
        albumId: photo.folder ?? "",
        latitude: 0,
        longitude: 0,
        secureUrl: photo.secure_url,
        previewUrl: generatePhotoPreviewUrl(photo.secure_url),
        username: username,
        format: photo.format,
        bytes: photo.bytes,
        width: photo.width,
        height: photo.height,
        imageMetadata: {
            createDate: photo.image_metadata.CreateDate,
            dateTimeOriginal: photo.image_metadata.DateTimeOriginal,
            make: photo.image_metadata.Make,
            model: photo.image_metadata.Model,
            orientation: photo.image_metadata.Orientation,
            exposureProgram: photo.image_metadata.ExposureProgram,
            iso: photo.image_metadata.ISO,
            shutterSpeedValue: photo.image_metadata.ShutterSpeedValue,
            apertureValue: photo.image_metadata.ApertureValue,
            brightnessValue: photo.image_metadata.BrightnessValue,
            exposureCompensation: photo.image_metadata.ExposureCompensation,
            meteringMode: photo.image_metadata.MeteringMode,
            flash: photo.image_metadata.Flash,
            focalLength: photo.image_metadata.FocalLength,
            exposureMode: photo.image_metadata.ExposureMode,
            whiteBalance: photo.image_metadata.WhiteBalance,
            lensInfo: photo.image_metadata.LensInfo,
            lensMake: photo.image_metadata.LensMake,
            dateCreated: photo.image_metadata.DateTimeOriginal
        },
        colors: photo.colors,
        tags: photo.tags,
    }
}

const generatePhotoPreviewUrl = (secureUrl: string) => {
    const photo_publicId = extractPublicId(secureUrl);
    const previewUrl = buildUrl(`${photo_publicId}`, {
        cloud: {
            cloudName: 'bethany', 
        },
        transformations: {
            effect: {
                name: 'blur',
                value: 1000
            },
            quality: 1
        }
    });

    return previewUrl;
}