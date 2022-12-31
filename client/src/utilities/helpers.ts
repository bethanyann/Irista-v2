import { buildUrl, extractPublicId } from 'cloudinary-build-url';

//use for session storage
export const isPersistedState = (stateName: string) : any => {
    //gets item from session storage with the name that is passed in
    const sessionState = sessionStorage.getItem(stateName.toString());
    return sessionState && JSON.parse(sessionState);
}

export const mapCloudinaryDataToGraphQLModel = (photo: any) => {

}

/// takes in a photo's secure cloudinary url and returns a url for a blurred version of the 
/// image to use as a placeholder while loading
export const generatePhotoPreviewURL = (secureUrl: string) => {
    const photoPublicId = extractPublicId(secureUrl);
    let previewUrl = buildUrl(`${photoPublicId}`, {
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