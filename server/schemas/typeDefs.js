const { gql } = require('apollo-server-express');

const typeDefs = gql`
    input BookInput {
        authors: String
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        authors: String
        description: String
        bookID: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(username: String!): User
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input : BookInput) : User
        removeBook(bookId: String!): User
    }
`;

module.exports= typeDefs;