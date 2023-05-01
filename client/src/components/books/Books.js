import React, { useEffect, useState } from 'react'
import Book from '../book/Book'
import './books.css'
import axios from 'axios'
import Searchbar from '../searchbar/Searchbar'

export default function Books({ path }) {
  const baseUrl = 'https://devtruth-bookly.herokuapp.com/api/books'

  const [books, setBooks] = useState([])
  const [url, setUrl] = useState(baseUrl)
  const [text, setText] = useState('See latest books')

  const handleUrlChange = (query) => {
    setUrl(baseUrl + query)
  }
  const handleTextChange = (text) => {
    setText(text)
  }

  useEffect(() => {
    try {
      axios.get(url)
      .then(res => {
        setBooks(res.data)
      })
    }catch(ex) {}
  }, [url])
  
  return (
    <div className="books">
      <Searchbar handleUrlChange={handleUrlChange} />
      { books.length > 0 ? <h3>{text}</h3> : <h3>No books available now</h3>}
      {books.map(book => <Book book={book} handleUrlChange={handleUrlChange} handleTextChange={handleTextChange} path={path} key={book._id}/>)}
    </div>
  )
}
