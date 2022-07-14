//get the users type object from the models 
const User = require('../../models/User');
const { ApolloError, UserInputError } = require('apollo-server-errors');
//key
const { REACT_APP_JSON_WEB_TOKEN } = require('../../config');
//password hashing
const bcrypt = require('bcryptjs'); 
//web token
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {  
        //the structure of this is defined in typedefs
        async registerUser(_, {userInput: {username, email, password, confirmPassword}} ){

            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
            console.log(errors, valid);

            if(!valid){
                throw new UserInputError('errors', {errors});
            }

            //see if old user exists with same email attempting to reregister
            const oldUser = await User.findOne({ email });
            //throw error if user already exists
            if(oldUser) {
                //throw apollo server error provided from imported package
                throw new ApolloError(`A user with the email address ${email} already exists.`, 'USER_ALREADY_EXISTS');
            }

            const oldUsername = await User.findOne({ username });
            if(oldUsername) {
                throw new ApolloError(`A user with the username ${username} already exists.`, 'USER_ALREADY_EXISTS');
            }

            //encrypt password
            var encryptedPassword = await bcrypt.hash(password, 12);

            //build out mongoose model (User)
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword,
                createdAt: new Date().toUTCString
            });

            //save new user in mongodb
            const result = await newUser.save();

            newUser.token = generateToken(result);

            return {
                id: result._id,
                ...result._doc,
                token
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
                throw new ApolloError(`User with username ${username} not found.`, 'BAD_USER_INPUT');
            }

            var correctPassword = await bcrypt.compare(password, user.password);
            if(user && correctPassword) {
                //create new token
                user.token = generateToken(user);

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
        user: (_, { ID }) => User.findById(ID) //I think .findById is some mongoose stuff?
    }
}

//helper function to generate user token
function generateToken(user) {
    //the purpose of this is once the user is verified, they can be given a token thats good for the next x amount of hours
    //can make sure that the user can only access their own data, and not other users' data 
    
    //.sign takes three arguments: payload (what data are we sending along with it), secret string that controls how the jwt is generated,
    //and options, which define the "expires in" for the token
    const jwtToken = jwt.sign(
        { 
            user_id: user.id, 
            email: user.email,
            username: user.username
        }, 
        REACT_APP_JSON_WEB_TOKEN,
        {
            expiresIn: "12h"
        }
    );

    return jwtToken;
}