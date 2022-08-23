const Photo = require('../../models/Photo');

module.exports = {
    Mutation: {
        async createPhoto(_, {photoInput: { photoName, albumId, photoLatitude, photoLongitude, photoSecureUrl}}) {
            //create new mongoose Photo model object to send to db
            const newPhoto = new Photo({
                photoId: photoName,
                photoName: photoName,
                albumId: albumId ?? "",
                photoLatitude: photoLatitude ?? 0,
                photoLongitude: photoLongitude ?? 0,
                isFavorite: false,
                createdAt: new Date().toUTCString(),
                photoSecureUrl: photoSecureUrl ?? ""
            });

            //console.log(newPhoto);
            const result = await newPhoto.save();

            console.log(result);
            return {
                id: result._id,
                ...result._doc,
            }
        },
        async updatePhotoName(_, { updatePhotoInput: { photoId, newPhotoName}}) {
            
        },
        async updatePhotoFavorite(_, { photoId }) {

        }
    },
    Query: {
        async getPhotos(_, { albumId }) {
            try {
                const filter = { albumId: albumId };
                const photos = await Photo.find(filter).exec();

                return photos;
            } catch(error) {
                throw new Error(error);
            }
        },
        async getPhoto(_, { photoId }) {
            try {
                const photo = await Photo.findOne({photoId: photoId}).exec();

                if(photo) {
                    return photo;
                } else {
                    throw new Error("Photo Not Found");
                }
            } catch(error) {
                throw new Error(error);
            }
        }
    }
}