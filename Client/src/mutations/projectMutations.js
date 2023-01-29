import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
    mutation addProject( $name: String!, $description: String!, $status: String!, $client: ID!) {
        addProject( name: $name, description: $description, status: $status, client: $client) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`

const UPDATE_PROJECT = gql`
    mutation updateProject ($id: ID!, $name: name, $description: description, $status: status) {
        updateProject(id: $id, name: $name, description: $description, status: $status) {
            name
            description
            status
        }
    }
`

export { DELETE_PROJECT, ADD_PROJECT, UPDATE_PROJECT };