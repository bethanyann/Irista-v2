//get the users type object from the models 
const User = require('../../models/User');
const { ApolloError, UserInputError } = require('apollo-server-errors');
//helpers
const { validateRegisterInput, validateLoginInput } = require('../../utilities/userValidation');
//key
const { REACT_APP_JSON_WEB_TOKEN } = require('../../config');
//password hashing
const bcrypt = require('bcryptjs'); 
//web token
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {  
        //the structure of this is defined in typedefs
        async registerUser(_, { registerInput: {username, email, password, confirmPassword}} ){

            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);

            if(!valid){
                throw new UserInputError('errors', {errors});
            }

            //see if old user exists with same email attempting to reregister
            const oldUser = await User.findOne({ email });
            //throw error if user already exists
            if(oldUser) {
             
                //use an apollo error here instead of just returning a generic error
                //the payload will have an error message and an error object
                throw new UserInputError('USER_ALREADY_EXISTS', {
                    errors:{
                        username: `A user with the email address ${email} already exists.`
                    }
                });
                //throw new ApolloError(`A user with the email address ${email} already exists.`, 'USER_ALREADY_EXISTS');
            }

            const oldUsername = await User.findOne({ username });
            if(oldUsername) {
                throw new UserInputError('USER_ALREADY_EXISTS', {
                    errors:{
                        username: `A user with the username ${username} already exists.`
                    }
                });
                //throw new ApolloError(`A user with the username ${username} already exists.`, 'USER_ALREADY_EXISTS');
            }

            //encrypt password
            var encryptedPassword = await bcrypt.hash(password, 12);

            //build out mongoose model (User)
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword,
                createdAt: new Date().toISOString()
            });

            //save new user in mongodb
            const result = await newUser.save();

            newUser.token = generateToken(result);

            return {
                id: result._id,
                ...result._doc,
            }
        },
        async loginUser(_, {loginInput: {username, password}}) {
            //validate input
            const {valid, errors} = validateLoginInput(username, password);
            if(!valid){
                throw new UserInputError('errors', {errors});
            }

             //see if user exists with that username
            const user = await User.findOne({ username });
            if(!user) {
                throw new UserInputError('USER_NOT_FOUND', {
                    errors: {
                        username: `User with username ${username} not found.`
                    }
                });
            }

            var correctPassword = await bcrypt.compare(password, user.password);
            if(user && correctPassword) {
                //create new token
                token = generateToken(user);
                user.token = token;

                return {
                    id: user._id,
                    ...user._doc,
                    token
                }
            }
            else {
                //if passwords do not match
                throw new ApolloError('Incorrect password.', 'INCORRECT_PASSWORD');
            }
        }
    },
    Query: {
        user: (_, { ID }) => User.findById(ID) //I think .findById is mongoose
    }
}

//helper function to generate user token
function generateToken(user) {
    //the purpose of this is once the user is verified, they can be given a token thats good for the next x amount of hours
    //can make sure that the user can only access their own data, and not other users' data 
    
    //.sign takes three arguments: payload (what data are we sending along with it), secret string that controls how the jwt is generated,
    //and options, which define the "expires in" for the token
    return jwt.sign(
        { 
            id: user._id, 
            email: user.email,
            username: user.username
        }, 
        REACT_APP_JSON_WEB_TOKEN,
        {
            expiresIn: "12h"
        });
}