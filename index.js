//get the Apollo Server from the npm package 
const { ApolloServer } = require('apollo-server-express');
//server stuff
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const cors = require('cors');
const http = require('http');
const path = require('path');
//cloudinary
const { cloudinary } = require('./utilities/cloudinary');

const app = express();
//to fix a 'payload too large' error i was getting with the post requests
app.use(express.json({limit: '50mb'}));

//////////////////////////////////
////     PHOTO API CALLS  ////////
//////////////////////////////////

// GET ALL USER PHOTOS FOR HOMEPAGE PHOTO TIMELINE GRID 
app.get('/api/getPhotos/:username', async (req, res) => {
    try {
        let username = req.params.username;
        //SearchAPI using context
        results = await cloudinary.search.expression(`context.username=${username}`).sort_by('created_at', 'desc').max_results(20).execute();

        // console.log(results);
        res.send(results);
    } catch(error) {
       console.log(error);
       res.send(500).json(error);
    }
});

app.get('/api/getPhotos/:username/:nextCursor', async (req, res) => {
    try {
        let username = req.params.username;
        let nextCursor = req.params.nextCursor;
    
        const results = await cloudinary.search.expression(`context.username=${username}`).next_cursor(nextCursor).sort_by('created_at', 'desc').max_results(10).execute();
        //console.log(results);
        res.send(results);
    } catch(error) {
       // console.log(error);
       res.send(500).json(error);
    }
});

// GET SINGLE PHOTO DETAILS
app.get('/api/getPhotoInfo/:encodedPhotoId', async (req,res) => {
    try {
        let photoId = req.params.encodedPhotoId;
        const photo = await cloudinary.api.resource(photoId, {resource_type: 'image', colors: true, image_metadata: true});
        res.send(photo);
    } catch(error){
        res.send(500).json(error);
    }
})

// UPLOAD A PHOTO WITHOUT AN ALBUM
app.post('/api/uploadPhotos/:username/:filename', async (req,res) => {
    try {
        let username = req.params.username;
        let filename = req.params.filename;
        let fileString = req.body.data;

        //changed the upload to an unsigned response so that I can perform on the fly transformations 10/21/22

        // const uploadResponse = await cloudinary.uploader.upload(fileString, {
        //     upload_preset: 'canon_irista',
        //     timestamp: (Date.now()/1000).toString(),
        //     public_id: filename,
        //     context: `username=${username}`,
        // });

        const uploadResponse = await cloudinary.uploader.unsigned_upload(fileString, 'canon_irista', {
            timestamp: (Date.now()/1000).toString(),
            public_id: filename,
            context: `username=${username}`
        })
        console.log(uploadResponse);
        res.send(uploadResponse);

    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

// UPLOAD A PHOTO & ASSIGN IT TO AN ALBUM
app.post('/api/uploadPhotos/:username/:filename/:albumName', async (req,res) => {
    try {
        let username = req.params.username;
        let filename = req.params.filename;
        let albumname = req.params.albumName
        let fileString = req.body.data;

        const uploadResponse = await cloudinary.uploader.upload(fileString, {
            upload_preset: 'canon_irista',
            timestamp: (Date.now()/1000).toString(),
            public_id: filename,
            context: `username=${username}`,
            folder: albumname
        });

        res.send(uploadResponse);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

// POST PHOTO TAGS WHEN NEW ONES ARE ADDED OR TAGS ARE DELETED
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


// RENAME A FILE/PHOTO FROM THE PHOTO INFO PAGE
app.get('/api/renamePhoto/:encodedOldFileName/:encodedNewFilename', async (req, res) => {
    try {
        let oldFileName = req.params.encodedOldFileName;
        let newFileName = req.params.encodedNewFilename;

        await cloudinary.uploader.rename(oldFileName, newFileName, {overwrite: true, colors: true, tagList: true, image_metadata: true}).then(result => {
            res.send(result)
        }).catch(error => {
            res.send(error)
        });

    } catch(error) {
        res.status(500).json({error: "something went wrong with renaming a file"});
    }
});

// SEARCH FOR A PHOTO 
app.get('/api/fetchSearchResults/:username/:searchText', async (req,res) => {
    try {
        let username = req.params.username;
        let searchText = req.params.searchText;

        const results = await cloudinary.search.expression(`context.username=${username} AND tags:${searchText}* OR ${searchText} OR filename:${searchText} OR public_id:${searchText}`).sort_by('created_at', 'desc').max_results(30).execute();
        res.send(results);
    } catch(error) {
        res.status(500).json({error: "Search fetch was unsuccessful"});
    }
});

//////////////////////////////////
////     ALBUM API CALLS  ////////
//////////////////////////////////

//CREATE AN ALBUM AND RETURN LIST OF ALBUMS
app.get('/api/createAlbum/:username/:albumname', async (req, res) => {
    try{
        let albumName = req.params.albumname;
        let userName = req.params.username;

        const createAlbumResponse = await cloudinary.api.create_folder(`${userName}/${albumName}`)
        res.send(createAlbumResponse);
    } catch(error) {
        res.status(500).json({ error: "Something went wrong"});
    }
})

// GET ALL ALBUMS/FOLDERS FOR ONE USER 
app.get('/api/getAllAlbums/:username', async (req, res) => {
    try {
        let albumList = [];
        let userName = req.params.username;
        //get all of the user's albums
        const albums = await cloudinary.api.sub_folders(`${userName}`);
        //console.log(albums.folders); - for testing errors
        
        //for each album, get the first photo uploaded and assign that to an array with the album
        if(albums)
        {
            await Promise.all(albums.folders.map(async (album) => {
                const photo =  await cloudinary.search.expression(`folder:"${album.path}" AND resource_type:image`).max_results(1).execute();

                if(photo.total_count > 0) {
                    albumList.push([
                        album,
                        photo.resources[0]
                    ]);
                }
                else {
                    albumList.push([
                        album,
                        {}
                    ])
                }
            }));
        }
        //return list of album/cover image pairs 
        res.send(albumList);
    } catch(error) {
        res.status(500).json({ error: error.error});
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
        res.status(500).json({error: "something went wrong with the fetch request"});
    }
});

// DELETE SET OF PHOTOS FROM ALBUM
app.post('/api/deletePhotos', async (req,res) => {
    try{
        let photoList = req.body;
        console.log(photoList);

        await cloudinary.api.delete_resources(photoList).then(
            response => {
                res.send(response);
            }
        );

    } catch(error) {
        res.status(500).json({error: "something went wrong when deleting the photo list"});
    }

});

// const httpServer = http.createServer(app);
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
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true})
    .then(() => {
         //this will wait for the connection to the db to be established 
        console.log("MongoDB Connected");
        startApolloServer();
    }).catch(error => {
        console.log(error);
    });


// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    // app.use(express.static("client/build"));
    console.log = function() {};

    app.use(express.static(path.join(__dirname, "client/build")));

    app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


async function startApolloServer()
{
    await server.start();
    server.applyMiddleware({app, path: '/'} );

    const PORT = process.env.PORT || 5000;

    await new Promise(resolve => httpServer.listen({port: process.env.PORT || 5000}, resolve)).then((resolve) => {
        console.log(`Process ENV port is ${PORT}`);
        console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
    }).catch(error => console.log(error));
}