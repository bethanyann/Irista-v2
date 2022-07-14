//get the actual message object from the models 
import Message, { findById } from '../../models/Message';

//best practice is to separate mutations and queries into different sections:
export const Mutation = {
    async createMessage(_, { messageInput: { text, username } }) {
        //basic push data to the database sort of thing here 
        //create new mongoose Message model object to send to the db
        const newMessage = new Message({
            text: text,
            createdBy: username,
            createdAt: new Date().toUTCString()
        });

        //save to the database where our MongoDB connection string is pointing 
        //mutations are async so await this call
        const result = await newMessage.save();
        console.log(result);

        //return the graphQL result
        return {
            id: result.id,
            ...result._doc // spread out the rest of the items in the result - kinda a weird format but it works
        };
    }
};
export const Query = {
    //unsure what this first param represents here, but setting it as an underscore since we aren't going to use it 
    message: (_, { ID }) => findById(ID) //I think .findById is some mongoose stuff?
};