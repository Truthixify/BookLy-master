import React, { useContext} from 'react'
import Books from '../../components/books/Books'
import Bottombar from '../../components/bottombar/Bottombar'
import './profile.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext/Context'

export default function Profile() {

  const { user } = useContext(UserContext)

  return (
    <div className="profile">
      <Books path={'/user/'+user._id}/>
      <Bottombar>
        <Link to={`/user/${user._id}/publish`} className='bottombarLink'>
          <i className="fa-solid fa-plus"></i>
          <p>New Book</p>
        </Link>
        <Link to={`/user/${user._id}/settings`} className='bottombarLink'>
          <i className="fa-solid fa-gear"></i>
          <p>Settings</p>
        </Link>
      </Bottombar>
    </div>
  )
}
