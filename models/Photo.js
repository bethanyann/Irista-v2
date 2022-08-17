const { model, Schema } = require('mongoose');

const photoSchema = new Schema({
    photoId: String,  //this will be the original photo filename (or assetId?) and will not change
    photoName: String, //this will be the mutable filename 
    photoLatitude: number,
    photoLongitude: number,
    isFavorite: boolean,
    createdAt: Date,
    photoSecureUrl: String //storing the cloudinary url in case I want it later
})