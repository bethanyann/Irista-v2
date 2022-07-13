const { model, Schema } = require('mongoose');

//define the schema of the model to mirror the model in the typeDefs.js file 
const messageSchema = new Schema({
    text: String,
    createdAt: String,
    createdBy: String
});

//export the model so it can be used with the resolvers in graphQL 
module.exports = model('Message', messageSchema);