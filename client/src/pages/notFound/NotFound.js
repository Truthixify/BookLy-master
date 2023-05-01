import React from 'react'
import { Link } from 'react-router-dom'
import Bottombar from '../../components/bottombar/Bottombar'
import './notFound.css'

export default function NotFound() {
  return (
    <div className="notFound">
      <h3>
        The page you requested is not found
        <p>404 </p>
      </h3>
      <div>
      <p>Click the button below to go back to the homepage</p>
      <button className='notFoundButton'>
      <Link to='/'>Home</Link>
      </button>
      </div>
    </div>
  )
}
