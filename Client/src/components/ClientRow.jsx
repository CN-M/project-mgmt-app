import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'

import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

const ClientRow = ({ client }) => {
    const { name, email, phone, id } = client
    
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id },
        update(cache, { data: { deleteClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS
            })
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.filter(client => client.id !== deleteClient.id) }
            })
        }
    })

  return (
    <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
            <button onClick={deleteClient} className="btn btn-danger btn-sm">
                <FaTrash />
            </button>
        </td>
    </tr>    
  )
}

export default ClientRow