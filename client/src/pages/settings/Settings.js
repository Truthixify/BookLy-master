import React, { useContext, useState } from 'react'
import './settings.css'
import axios from 'axios'
import { UserContext } from '../../context/userContext/Context'

export default function Settings() {

  const { user } = useContext(UserContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const url = 'https://devtruth-bookly.herokuapp.com/api/users/'+user._id

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.put(url, {name, password}, {
        headers: {
          "x-auth-token": user.token
        }
      })
      setLoading(false)
    }catch(ex) {

    }
  }
  return (
    <div className="settings">
      <h3>Change Your Details</h3>
      <form onSubmit={handleSubmit}>
        <input className='settingsInput' type="text" name='name' placeholder='enter your new name' required onChange={(e) => setName(e.target.value)}/>
        <input className='settingsInput' type="password" name='password' placeholder='enter your new password' required onChange={(e) => setPassword(e.target.value)}/>
        <input className='settingsButton' type="submit" value="submit" disabled={loading} />
      </form>
    </div>
  )
}
