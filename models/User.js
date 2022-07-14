const { model, Schema } = require('mongoose');

//MongoDB is schemaless but sometimes it is safer to make a schema anyway just to avoid data mismatches and errors
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: Date,
    token: String
});

//export the model with the name it has and the schema to pair it with
module.exports = model('User', userSchema);