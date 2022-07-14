import { model, Schema } from 'mongoose';

//define schema
const userSchema = new Schema({
    username: {type: String, default: null},
    email: {type: String, unique: true}, //setting unique to true will throw errors if value is duplicated
   // confirmPassword: {type: String},
    password: String,
    token: String
});

//construct and export model
model.exports = model('User', userSchema )
