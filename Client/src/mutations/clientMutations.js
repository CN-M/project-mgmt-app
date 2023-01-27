import { gql } from "@apollo/client"

// const ADD_CLIENT = gql`
//     mutation addClient(name)
// `

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

export { DELETE_CLIENT };