import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries"
import { UPDATE_PROJECT } from "../mutations/projectMutations"

const EditProjectForm = ({ project }) => {
    const { id } = project

    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState('new')

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id , name, description, status  },
        refetchQueries: [{ query: GET_PROJECT, variables: { id } }]
    })

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name || !description || !status) {
            alert('Please Fill out data')
        } 

        updateProject(name, description, status)
    }

  return (
    <div className="mt-5">
        <h3>Update Project Detaiils</h3>
        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-lable">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    />
                            </div>
                            <div className="mb-3">
                                <label className="form-lable">Description</label>
                                <textarea 
                                    className="form-control" 
                                    id="description" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    >
                                    </textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-lable">Status</label>
                                <select 
                                    id="status" 
                                    className="form-select" value={status} 
                                    onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="new">Not Started</option>
                                        <option value="progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                            </div>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                Submit
                            </button>
            </form>
    </div>
  )
}

export default EditProjectForm