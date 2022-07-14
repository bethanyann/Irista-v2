const messageResolvers = require('./messages');
const userResolvers = require('./users');

//this file is helping us consolidate the import statements for all of the queries and resolvers into one file to make it easier to import
module.exports = {
    Query: {
        ...messageResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...messageResolvers.Mutation,
        ...userResolvers.Mutation
    }
}