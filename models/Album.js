const { model, Schema } = require('mongoose');

const albumSchema = new Schema({
    albumId: Number,
    albumName: String, //this will be mutable
    createdAt: Date,
    createdBy: String //this will be the users username
});

module.exports = model('Album', albumSchema);