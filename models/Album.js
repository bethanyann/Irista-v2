const { model, Schema } = require('mongoose');

const albumSchema = new Schema({
    albumId: String, //this will be the name of the album when created and will not change
    albumName: String, //this will be mutable
    createdAt: Date,
    createdBy: String //this will be the users username
});

module.exports = model('Album', albumSchema);