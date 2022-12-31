//assign gql to a const; the keyword allows you to write gql syntax inside of javascript
const { gql } = require('apollo-server');

module.exports = gql`
    type Photo {
        id: ID!
        photoId: String #this will be the photo's original filename in cloudinary 
        photoName: String #this will be the photo's display name to user
        photoLatitude: Float #should this be Int? float? 
        photoLongitude: Float #same here.. is float ok? 
        isFavorite: Boolean
        createdAt: String
        photoSecureUrl: String
        previewUrl: String
        #need to add the new fields here
    }

    input NewPhotoInput {
        photoId: String! #this will be the immutable filename and will not change
        filename: String! #this will be the original filename on first upload but can change 
        albumId: String! #this is not meant to be a fk, just a way to pull out what photos are in an album
        latitude: Float
        longitude: Float
        secureUrl: String!
        previewUrl: String!
        #isFavorite: Boolean
        #recently added fields to convert from cloudinary to mongodb
        username: String! #username of user who owns the photo
        format: String #file format (jpg png etc)
        bytes: Int
        width: Int
        height: Int
        imageMetadata: [ImageMetadata]
        colors: [] # unsure of the shape of this, it's just an array in types.ts
        tags: [String]
    }

    input ImageMetadata {
        createDate: String
        dateTimeOriginal: String

    }

    input UpdatePhotoInput {
        photoId: String!
        newPhotoName: String!
    }

    type Album {
        id: ID!
        albumId: String! #this will be the album's name in cloudinary
        albumName: String! #this will be the album's display name to user
        createdAt: String!
        createdBy: String!
    }

    input AlbumInput {
        albumName: String!
        username: String!
    }

    input UpdateAlbumInput {
        albumId: String!
        newAlbumName: String!
    }

    type User {
        id: ID!
        username: String!
        password: String!
        email: String!
        createdAt: String!
        token: String!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    input LoginInput {
        username: String!
        password: String! 
    }

    type Query {
        user(id: ID!): User!
        photo(id: ID!): Photo!
        
        getAlbum(albumId: String!): Album
        getAlbums(username: String!): [Album]

        getPhoto(photoId: String!): Photo
        getPhotos(albumId: String!): [Photo]
    }
    
    type Mutation {
        registerUser(registerInput: RegisterInput): User!
        loginUser(loginInput: LoginInput): User!

        createPhoto(newPhotoInput: NewPhotoInput): Photo
        updatePhotoName(updatePhotoInput: UpdatePhotoInput): String! #return new name of photo
        updatePhotoFavorite(photoId: String!): Boolean!  #return true/false
        #updatePhotoAlbum(albumId: String, photoIds: String[], newAlbumName: String): [Photo] #unsure of what to return atm

        createAlbum(albumInput: AlbumInput): Album!
        updateAlbum(updateAlbumInput: UpdateAlbumInput): String! #return new name of album
    }
`;