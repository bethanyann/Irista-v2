const jwt = require('jsonwebtoken');
const { REACT_APP_JSON_WEB_TOKEN } = require('../config');

const { AuthenticationError } = require('apollo-server');

module.exports = (context) => {
    //context has the header inside of it like this {...headers}
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        //bearer ... token so we need to split the 'bearer' text away from the token itself
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, REACT_APP_JSON_WEB_TOKEN);
                return user;
            } catch(err){
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('Authorization header must be provided');       
}
