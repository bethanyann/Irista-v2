//get the Apollo Server from the npm package 
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');


//initilize the Apollo server - takes typedefs and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//Mongoose Connection here 
mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => { //this will wait for the connection to the db to be established 
        console.log("MongoDB Connected");
        return server.listen({port: 5000});
    }).then((res) => {
        console.log(`Server running at ${res.url}`);
});