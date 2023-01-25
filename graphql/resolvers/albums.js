//get the actual album object from the models 
const Album = require('../../models/Album');

// //best practice is to separate mutations and queries into different sections:
module.exports = {
    Mutation: {
        async createAlbum(_, {albumInput: {
            username, 
            albumName,
           // coverPhotoUrl
        }}) {
            const albumExists = await Album.findOne({ username, albumName });

            if(albumExists) {
                throw new Error(`Album name ${albumName} already exists.`);
            }
           
            const newAlbum = new Album({
                albumId: Math.random().toString().slice(2,11),
                albumName: albumName, //this will be the album name to start
                createdAt: new Date().toUTCString(),
                createdBy: username,
                // coverPhotoUrl: coverPhotoUrl ?? ""
            });

            const result = await newAlbum.save();

            return {
                id: result.id,
                ...result._doc
            }
            
        },
        async updateAlbum(_, {updateAlbumInput: { albumId, newAlbumName } }) {

            const filter = { albumId: albumId};
            const update = { albumName: newAlbumName}

            //https://mongoosejs.com/docs/tutorials/findoneandupdate.html
            let doc = await Album.findOneAndUpdate(filter, update, {
                new: true
            });

            return doc.albumName;
        }
    },
    Query: { 
        async getAlbums(_, { username }) {
            try {
                const filter = { createdBy: username }; 
                const albums = await Album.find(filter).exec();

                return albums;
            } catch(error) {
                throw new Error(error);
            }
        },
        async getAlbum(_, { albumId }) {
            try {
                const album = await Album.findOne({albumId: albumId}).exec();

                if(album) {
                    return album;
                } else {
                    throw new Error("Album Not Found");
                }
            } catch(error) {
                //handle this differently? 
                throw new Error(error);
            }
        }
    }
 };
