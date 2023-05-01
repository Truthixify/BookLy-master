import React, { useContext, useEffect } from 'react'
import './home.css'
import Books from '../../components/books/Books'
import Bottombar from '../../components/bottombar/Bottombar'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext/Context'

export default function Home() {

  const { dispatch } = useContext(UserContext)

  useEffect(() => {
    dispatch({ type: "LOGOUT" })
  }, [dispatch])
  
  return (
    <div className="home">
      
      <Books path={'/'} />
      <Bottombar>
        <Link to='/' className='bottombarLink'>
          <i className="fa-solid fa-house"></i>
          <p>Home</p>
        </Link>
        <Link to='/register' className='bottombarLink'>
          <i className="fa-solid fa-user-plus"></i>
          <p>Register</p>
        </Link>
      </Bottombar>
    </div>
  )
}
