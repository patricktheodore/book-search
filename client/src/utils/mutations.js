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
    mutation addUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!) {
        saveBook(bookId: $bookId) {
            user {
                _id
                username
                savedBooks {
                    authors
                    description
                    bookId
                    image
                    link
                    title
                }
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $BookId) {
            user {
                _id
                username
                savedBooks {
                    authors
                    description
                    bookId
                    image
                    link
                    title
                }
            }
        }
    }
`

