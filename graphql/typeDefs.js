//assign gql to a const; the keyword allows you to write gql syntax inside of javascript
const { gql } = require('apollo-server');

module.exports = gql`
    # defining a type 
    # type Message {
    #     text: String
    #     createdAt: String
    #     createdBy: String
    # }

    type Photo {
        id: ID!
        photoId: String! #this will be the photo's original filename in cloudinary
        photoName: String! #this will be the photo's display name to user
        photoLatitude: Float #should this be Int? float? 
        photoLongitude: Float #same here.. is float ok? 
        isFavorite: Boolean!
        createdAt: String!
        photoSecureUrl: String
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

    #can also create input types
    #this will go into apolloserver just like a plain javascript object
    # input MessageInput {
    #     text: String
    #     username: String
    # }

    #create an input type for when a user registers on the site
    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    #create an input type for when a user logs in
    input LoginInput {
        username: String!
        password: String! 
    }

    input PhotoNameInput {
        photoId: String!
        newPhotoName: String!
        oldPhotoName: String!
    }

    input PhotoFavoriteInput {
        isFavorite: boolean!
    }

    # get message by id query
    type Query {
        # message(id: ID!): Message!
        user(id: ID!): User!
        photo(id: ID!): Photo!
        
        getAlbum(albumId: String!): Album
        getAlbums(username: String!): [Album]
    }
    
    type Mutation {
        # createMessage(messageInput: MessageInput): Message!
        registerUser(registerInput: RegisterInput): User!
        loginUser(loginInput: LoginInput): User!

        createPhoto(photoInput: Photo): Photo!
        updatePhotoName(photoNameInput: PhotoNameInput): String! #return new name of photo
        updatePhotoFavorite(photoFavoriteInput: PhotoFavoriteInput): boolean!  #return true/false
        
        createAlbum(albumInput: AlbumInput): Album!
        updateAlbum(updateAlbumInput: UpdateAlbumInput): String! #return new name of album
    }
`;