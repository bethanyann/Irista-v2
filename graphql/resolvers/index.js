const photoResolvers = require('./photos');
const userResolvers = require('./users');

//this file is helping us consolidate the import statements for all of the queries and resolvers into one file to make it easier to import
module.exports = {
    Query: {
        ...userResolvers.Query,
        ...photoResolvers.Query,

    },
    Mutation: {
        ...userResolvers.Mutation,
        ...photoResolvers.Mutation,
    }
}