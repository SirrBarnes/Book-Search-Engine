import gql from 'graphql-tag';

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]!
        bookCount: Number;
    }

    type Book {
        bookID: String
        authors: String[]
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    input BookInput {
        authors: String[]!
        description: String!
        title: String!
        bookId: String!
        image: String!
        link: String!
    }


    type Query {
        me: User
    }


    type Mutation {
        addUser(input: UserInput!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input: BookInput!): User
        removeBook(bookId: String!): User
    }
`;

export default typeDefs;