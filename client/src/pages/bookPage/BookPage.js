import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../context/userContext/Context'
import './bookPage.css'

export default function BookPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const url = 'https://devtruth-bookly.herokuapp.com/api/books/'+id

  const { user } = useContext(UserContext)

  const [book, setBook] = useState({})

  let check = false

  const getBook = async () => {
    try {
      const res = await axios.get(url)
      setBook(res.data)
    }catch(ex) {

    }  
  }

  useEffect(() => {
    getBook()
  }, [url])

  if(user) check = (user._id === book.userId)

  const handleDelete = async () => {
    try {
      await axios.delete(url, {
        headers: {
          "x-auth-token": user.token
        }
      })
      navigate(-1)
    }catch(ex) {

    }
  }
  
  return (
    <div className="bookPage">
      <div className="bookPageImg">
        <img src={book.image} alt="book" />
      </div>
      {check && <div className="bookPageEdit">
        <button className="delete" onClick={handleDelete}>
          <i className='fa-solid fa-trash'></i>
        </button>
      </div>}
      <div className="bookPageContent">
        <h3>Book Title : <span>{book.title}</span></h3>
        <h3>Book Written By : <span>{book.author}</span></h3>
        <p>{book.snippet}</p>
      </div>
    </div>
  )
}
