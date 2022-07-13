//assign gql to a const; the keyword allows you to write gql syntax inside of javascript
const { gql } = require('apollo-server');

module.exports = gql`
    # defining a type 
    type Message {
        text: String
        createdAt: String
        createdBy: String
    }

    #can also create input types
    #this will go into apolloserver just like a plain javascript object
    input MessageInput {
        text: String
        username: String
    }

    # get message by id query
    type Query {
        message(id: ID!): Message
    }

    #create message in db
    type Mutation {
        createMessage(messageInput: MessageInput): Message!
    }
`;