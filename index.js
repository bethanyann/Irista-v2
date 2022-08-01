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
// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:3000']
// }));
app.use(express.json());

// GET ALL USER PHOTOS FOR HOMEPAGE PHOTO TIMELINE GRID 
app.get('/api/getPhotos/:username', async (req, res) => {
    try{
       let username = req.params.username;
       //AdminAPI 
       //const { resources } = await cloudinary.api.resources({ type: 'upload', prefix: 'test', resource_type: 'image', max_results: 30, direction: 'desc'});
       //SearchAPI
       //const { resources } = await cloudinary.search.expression(`tags:${username}`).sort_by('created_at', 'desc').max_results(30).execute();
       //SearchAPI using context
       const { resources } = await cloudinary.search.expression(`context.username=${username}`).sort_by('created_at', 'desc').max_results(30).execute();

       res.send(resources);
    } catch(error) {
        console.log(error);
    }
})

// GET SINGLE PHOTO DETAILS
app.get('/api/getPhotoInfo/:encodedPhotoId', async (req,res) => {
    try {
        let photoId = req.params.encodedPhotoId;
        const photo = await cloudinary.api.resource(photoId, {resource_type: 'image', colors: true, image_metadata: true});
        res.send(photo);
    } catch(error){
        console.log(error);
    }
})

// UPLOAD A PHOTO WITHOUT ASSIGNING IT TO A FOLDER
app.post('/api/uploadPhotos/:username', async (req,res) => {
    try {
        console.log(req.body);
        console.log(req.data);
        //console.log(req.data.file);
        console.log(req.params.username);

        //  let file = req.body.data;
        //  let username = req.params.username;
        //  let fileName = req.params.filename;
        // console.log(file);
        // console.log(username);
        // console.log(fileName);

        // //maybe add folder here eventually  or make a new api call for folder
        // const uploadResponse = await cloudinary.uploader.unsigned_upload(file, {
        //     upload_preset: 'canon_irista',
        //     timestamp: (Date.now()/1000).toString(),
        //     public_id: fileName,
        //     context: ['username', username],
        // });

        //console.log(uploadResponse);

    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

//UPLOAD A PHOTO AND ASSIGN IT TO A FOLDER
app.post('/api/uploadPhotos/:username/:folderName', async (req,res) => {
    try {
        let file = req.body.data;
        let username = req.params.username;
        let folderName = req.params.folderName;
        let fileName = file.name.substring(0, file.name.indexOf('.'));

        //maybe add folder here eventually  or make a new api call for folder
        const uploadResponse = await cloudinary.uploader.upload(file, {
            upload_preset: 'canon_irista',
            timestamp: (Date.now()/1000).toString(),
            public_id: fileName,
            context: ['username', username],
            folder: folderName
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})


//CREATE AN ALBUM AND RETURN LIST OF ALBUMS
app.get('/api/createAlbum/:username/:albumname', async (req, res) => {
    try{
        let albumName = req.params.albumname;
        let userName = req.params.username;

        const createAlbumResponse = await cloudinary.api.create_folder(`${userName}/${albumName}`)
        res.send(createAlbumResponse);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong"});
    }
})

// GET ALL ALBUMS/FOLDERS FOR ONE USER 
app.get('/api/getAllAlbums/:username', async (req, res) => {
    try {
        let albumList = [];
        let userName = req.params.username;
        const albums = await cloudinary.api.sub_folders(`${userName}`);
        
        await Promise.all(albums.folders.map(async (album) => {
            const photo =  await cloudinary.search.expression(`folder:"${album.path}" AND resource_type:image`).max_results(1).execute();
           
            albumList.push([
                album,
                photo.resources[0]
            ]);
        }));

        res.send(albumList);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong"});
    }
})

// GET ALL PHOTOS INSIDE AN ALBUM ( NOT GRABBING SUB-ALBUMS YET )
app.get('/api/getAlbumPhotos/:albumName', async (req, res) => {
    try {
        let albumName = req.params.albumName;
        //need to put album name in additional quotes in case it has spaces in the name
        const photoList  = await cloudinary.search.expression(`folder:"${albumName}" AND resource_type:image`).max_results(100).execute();
        res.send(photoList);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: "something went wrong with the fetch request"});
    }
});

// POST A PHOTOS TAGS WHEN NEW ONES ARE ADDED OR TAGS ARE DELETED
app.post('/api/saveTags/:encodedPhotoId', async (req, res) => {
    try {
        let photoId = req.params.encodedPhotoId;
        let tagList = req.body.join(",");
       
        await cloudinary.api.update(`${photoId}`, {
            tags: req.body
        }).then(data => {
            res.send(data);
        }).catch(error => {
            console.log(error);
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({error: "something went wrong with the fetch request"});
    }
});


// DELETE SET OF PHOTOS FROM ALBUM
app.delete('/api/deletePhotos/', async (req,res) =>{
    try{
        let photoList = req.body;
        console.log(photoList);
        // await cloudinary.api.delete_resources(photoList).then(
        //     response => res.send(response)
        // );

    } catch(error) {
        console.log(error);
        res.status(500).json({error: "something went wrong when deleting the photo list"});

    }

});

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


