//get the Apollo Server from the npm package 
const { ApolloServer } = require('apollo-server-express');
//server stuff
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');
const cors = require('cors');
const http = require('http');
//cloudinary
const { cloudinary } = require('./utilities/cloudinary');

const app = express();
app.use(cors());

app.get('/api/getPhotos/:username', async (req, res) => {
    try{
       let username = req.params.username;
       console.log("did this work?" + username);

       const { resources } = await cloudinary.api.resources({ type: 'upload', prefix: 'test', resource_type: 'image', max_results: 30, direction: 'desc'});
       //console.log(resources);

       const sorted = resources.sort((objA, objB) => Number(objB.created_at) - Number(objA.created_at));
       //console.log(sorted);

       //send data back to frontend
       res.send(sorted);
    } catch(error) {
        console.log(error);
    }
})

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
// const getAssetInfo = async (publicId) => {

//     // Return colors in the response
//     const options = {
//       colors: true,
//     };

//     try {
//         // Get details about the asset
//         const result = await cloudinary.api.resource(publicId, options);
//         console.log(result);
//         return result.colors;
//         } catch (error) {
//         console.error(error);
//     }
// };






const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // cors: {
    //     origin: ["http://localhost:3000"]
    // },
    csrfPrevention: true,  // highly recommended
    cache: 'bounded',
})


//Mongoose Connection here 
mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => { //this will wait for the connection to the db to be established 
        console.log("MongoDB Connected");
        startApolloServer();
    }).catch(error => {
        console.log(error);
    });



async function startApolloServer()
{
    await server.start();
    server.applyMiddleware({app, path: '/'} );
    await new Promise(resolve => httpServer.listen({ port: 5000 }, resolve));
    
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}


