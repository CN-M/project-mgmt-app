import { useQuery } from '@apollo/client'

import logo from '../assets/graphql_logo.png'
import { GET_PROJECTS } from '../queries/projectQueries'

const Header = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS)

  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className="container">
            <a className='navbar-brand' href="/">
                <div className="d-flex">
                    <img src={logo} alt="logo" className='mr-2'/>
                    <div className="">Ember</div>
                </div>
            </a>
        </div>
    </nav>
  )
}

export default Header