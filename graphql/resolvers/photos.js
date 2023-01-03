const Photo = require('../../models/Photo');

module.exports = {
    Mutation: {
        async createPhoto(_, { newPhotoInput: { 
            filename, 
            albumId, 
            latitude, 
            longitude,
            secureUrl,
            previewUrl,
            username,
            format,
            bytes,
            width,
            height,
            imageMetadata,
            colors,
            tags
            }}) {
            
            //create new mongoose Photo model object to send to db
            const newPhoto = new Photo({
                photoId: filename,
                filename: filename,
                albumId: albumId ?? "",
                latitude: latitude ?? 0,
                longitude: longitude ?? 0,
                createdAt: new Date().toUTCString(),
                secureUrl: secureUrl ?? "",
                previewUrl: previewUrl ?? "",
                isFavorite: false, 
                username: username,
                format: format,
                bytes: bytes,
                width: width,
                height: height,
                imageMetadata: imageMetadata,
                colors: colors,
                tags: tags,
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