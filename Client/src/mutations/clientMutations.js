import { gql } from '@apollo/client'

const ADD_CLIENT = gql`
    mutation addClient( $id: ID!, $name: name!, $email: email!, $phone: phone!) {
        addClient( id: $id, name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`

export { DELETE_CLIENT, ADD_CLIENT };