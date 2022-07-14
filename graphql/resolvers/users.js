//get the users type object from the models 
const User = require('../../models/User');
import { ApolloError } from 'apollo-server-errors';
//password hashing
const bcrypt = require('bcryptjs'); 
//web token
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {
        //the structure of this is defined in typedefs
        async registerUser(_, {userInput: {username, email, password}}){
            //see if old user exists with email attempting to reregister
            const oldUser = await User.findOne({ email });

            //throw error if user already exists
            if(oldUser) {
                //throw apollo server error provided from imported package
                throw new ApolloError(`A user with the email address ${email} already exists.`, 'USER_ALREADY_EXISTS');
            }
            //encrypt password
            var salt = bcrypt.genSalt(10);
            var encryptedPassword = bcrypt.hash(password, salt);

            //build out mongoose model (User)
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            });

            //create json webtoken and attach to user model 

            //the purpose of this is once the user is verified, they can be given a token thats good for the next x amount of hours
            //can make sure that the user can only access their own data, and not other users' data 
            
            //.sign takes three arguments: payload (what data are we sending along with it), secret string that controls how the jwt is generated,
            //and options, which define the "expires in" for the token
            const jwtToken = jwt.sign(
                { user_id: newUser._id, email }, 
                process.env.REACT_APP_JSON_WEB_TOKEN,
                {
                    expiresIn: "12h"
                }
            );
            //attach token to user
            newUser.token = jwtToken;
            //save new user in mongodb
            const result = await newUser.save();

            return {
                id: result._id,
                ...result._doc
            }
        },
        async login(_, { loginInput: { username, password }}){

        }
    },
    Query: {
        user: (_, { ID }) => findById(ID) //I think .findById is some mongoose stuff?
    }
}