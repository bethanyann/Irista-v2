//assign gql to a const; the keyword allows you to write gql syntax inside of javascript
const { gql } = require('apollo-server');

module.exports = gql`
    # defining a type 
    type Message {
        text: String
        createdAt: String
        createdBy: String
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
    input MessageInput {
        text: String
        username: String
    }

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

    # get message by id query
    type Query {
        message(id: ID!): Message!
        user(id: ID!): User!
    }
    
    type Mutation {
        createMessage(messageInput: MessageInput): Message!
        registerUser(registerInput: RegisterInput): User!
        loginUser(loginInput: LoginInput): User!
    }
`;