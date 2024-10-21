import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation Mutation($input: UserInput!) {
        addUser(input: $input) {
            user {
                _id
                username
                email
                savedBooks{
                    bookID
                    authors
                    description
                    image
                    link
                    title
                }
                bookCount
            }
            token
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput!) {
        saveBook(input: $input) {
            authors
            description
            title
            bookId
            image
            link
        }
    }
`


export const REMOVE_BOOK = gql`
    mutation removeBook($bookID: String!) {
        removeBook(bookID: $bookId) {
            _id
            username
            savedBooks
        }
    }
`

export const SEARCH_GOOGLE_BOOKS = gql`

`