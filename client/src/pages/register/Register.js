import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const url = 'https://devtruth-bookly.herokuapp.com/api/auth/register'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post(url, {
        name, email, username, password
      })
      setError(false)
      navigate(`/login`)
      setLoading(false)
    }catch(ex) {
      setError(true)
    }

  }
  return (
    <div className="register">
      {error && <p className='invalid'>Username or Email aready exist. Please <Link to='/login'>Login</Link> to your account</p>}
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input className='registerInput' type="text" name='name' placeholder="enter your full name" required onChange={(e) => setName(e.target.value)}/>
        <input className='registerInput' type="email" name='email' placeholder='enter your email' required onChange={(e) => setEmail(e.target.value)}/>
        <input className='registerInput' type="text" name='username' placeholder='enter your username' required onChange={(e) => setUsername(e.target.value)}/>
        <input className='registerInput' type="password" name='password' placeholder='enter your password' required onChange={(e) => setPassword(e.target.value)}/>
        <input className='registerButton' type="submit" value="submit" disabled={loading} />
      </form>
    </div>
  )
}
