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
            }
            token
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput!) {
        saveBook(input: $input) {
            _id
            username
            email
            bookCount
            # savedBooks
        }
    }
`


export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`

// export const SEARCH_GOOGLE_BOOKS = gql`

// `

export const SEARCH_GOOGLE_BOOKS = (query: string) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
