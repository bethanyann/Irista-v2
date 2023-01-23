const photoResolvers = require('./photos');
const userResolvers = require('./users');
const albumResolvers = require('./albums');

//this file is helping us consolidate the import statements for all of the queries and resolvers into one file to make it easier to import
module.exports = {
    Query: {
        ...userResolvers.Query,
        ...photoResolvers.Query,
        ...albumResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...photoResolvers.Mutation,
        ...albumResolvers.Mutation
    }
}