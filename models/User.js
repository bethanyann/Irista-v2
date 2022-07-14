const { model, Schema } = require('mongoose');

//define schema
const userSchema = new Schema({
    username: {type: String, default: null, unique: true},
    email: {type: String, unique: true}, //setting unique to true will throw errors if value is duplicated
    createdAt: Date, 
    password: String,
    token: String 
});

//construct and export model
model.exports = model('User', userSchema )
