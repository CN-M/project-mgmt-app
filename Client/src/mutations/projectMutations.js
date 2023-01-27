import { gql } from '@apollo/client'

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
            name
            descritpion
            status
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

export { DELETE_PROJECT, UPDATE_PROJECT }