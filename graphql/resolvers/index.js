const messageResolvers = require('./messages');

//this file is helping us consolidate the import statements for all of the queries and resolvers into one file to make it easier to import
module.exports = {
    Query: {
        ...messageResolvers.Query
    },
    Mutation: {
        ...messageResolvers.Mutation
    }
}