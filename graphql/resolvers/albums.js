//get the actual album object from the models 
const Album = require('../../models/Album');

// //best practice is to separate mutations and queries into different sections:
module.exports = {
    
    Mutation: {
        async createAlbum(_, {albumInput: {albumName, username}}) {
            //create new mongoose Album model object to send to the db
            const newAlbum = new Album({
                albumId: albumName,
                albumName: albumName, //this will be the album name to start
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




   // async likePost(parent, {postId}, context)
    //     {
    //         const user = checkAuth(context);

    //         const post = await Post.findById(postId);
    //         if(post){
    //             //if this if statement returns truthy, it means the user has already liked this, and need to unlike it
    //             if(post.likes.find(like => like.username === user.username)){
    //                 //just remove the one like that has the username of the user that is unliking it
    //                 post.likes = post.likes.filter(like => like.username !== user.username);
    //             }else {
    //                 //not liked yet, so like post
    //                 post.likes.push({
    //                     username: user.username,
    //                     createdAt: new Date().toISOString()
    //                 });
    //             }

    //             await post.save();
    //             return post;
    //         } else {
    //             throw new UserInputError('Post not found');
    //         }
    //     }
//         async create(_, { messageInput: { text, username } }) {
//             //basic push data to the database sort of thing here 
//             //create new mongoose Message model object to send to the db
//             const newMessage = new Message({
//                 text: text,
//                 createdBy: username,
//                 createdAt: new Date().toUTCString()
//             });

//             //save to the database where our MongoDB connection string is pointing 
//             //mutations are async so await this call
//             const result = await newMessage.save();
      

//             //return the graphQL result
//             return {
//                 id: result.id,
//                 ...result._doc // spread out the rest of the items in the result - kinda a weird format but it works
//             };
//         }