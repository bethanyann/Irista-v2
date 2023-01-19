//get the actual album object from the models 
const Album = require('../../models/Album');

// //best practice is to separate mutations and queries into different sections:
module.exports = {
    
    Mutation: {
        async createAlbum(_, { albumInput: { albumName, username }}) {
            //create new mongoose Album model object to send to the db
            const newAlbum = new Album({
                albumId: Math.random().toString.slice(2,11), //gets a random 9 digit number
                albumName: albumName, 
                albumCreatedAt: new Date().toUTCString(),
                albumCreatedBy: username
            });

            //save to the db
            //mutations are async so await this call
            const result = await newAlbum.save();

            //now return graphQL result:
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
