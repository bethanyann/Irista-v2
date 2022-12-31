const { model, Schema } = require('mongoose');

const photoSchema = new Schema({
    photoId: String,  //this will be the original photo filename (or assetId?) and will not change
    filename: String, //this will be the mutable filename 
    albumId: String, //this is so I can pull all photo names for photos in an album?
    latitude: Number,
    longitude: Number,
    createdAt: Date,
    secureUrl: String, //storing the cloudinary url in case I want it later
    previewUrl: String,
    isFavorite: Boolean,
    username: String,
    format: String,
    bytes: Number,
    width: Number,
    height: Number,
    imageMetadata: [Schema.Types.Mixed],
    colors: [Schema.Types.Mixed],
    tags: [String]
});

module.exports = model('Photo', photoSchema);