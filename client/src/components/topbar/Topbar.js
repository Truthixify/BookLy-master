import React, { useContext } from 'react'
import './topbar.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext/Context'

export default function Topbar() {
  const { user, dispatch } = useContext(UserContext)

  const handleLogout = () => {
    if(user) dispatch({ type: "LOGOUT"})
  }

  return (
    <div className='topbar'>
      <div className="topbarLogo">
        <Link to='/' className='link'>
        <h1>BookLy</h1>
        </Link>
      </div>
      <div className="topbarLoginBtn">
        <Link to={user ? '' : 'login'} onClick={handleLogout}>
        <i className="fa-solid fa-right-to-bracket"></i>
        </Link>
      </div>
    </div>
    
  )
}
