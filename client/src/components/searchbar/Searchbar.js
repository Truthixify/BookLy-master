import React, { useState } from 'react'
import './searchbar.css'

export default function Searchbar({handleUrlChange}) {

  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    handleUrlChange(`?title=${search}`)
  }
  return (
    <form className='searchbar' onSubmit={handleSubmit}>
      <div className="searchbarInputHolder">
        <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
        <input className='searchbarInput' type="search" placeholder='Search Book By Title' value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
    </form>
  )
}
