import React, { useContext, useState } from 'react'
import './login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext/Context'

export default function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const url = 'https://devtruth-bookly.herokuapp.com/api/auth/login'

  const { dispatch, isFetching, error } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: "LOGIN_START" })
    
    try {
      const res = await axios.post(url, {
        username, password
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      navigate(`/user/${res.data._id}`)
    }catch(ex) {
      dispatch({ type: "LOGIN_FAILURE" })
    }
  }
  return (
    <div className="login">
      {error && <p className='invalid'>Invalid login credentials</p>}
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input className='loginInput' type="text" name='username' placeholder='enter your username' required onChange={(e) => setUsername(e.target.value)}/>
        <input className='loginInput' type="password" name='password' placeholder='enter your password' required onChange={(e) => setPassword(e.target.value)}/>
        <input className='loginButton' type="submit" value="submit" disabled={isFetching}/>
      </form>
      <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
    </div>
  )
}
