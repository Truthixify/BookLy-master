import React, { useContext, useState } from 'react'
import './bookForm.css'
import axios from 'axios'
import Bottombar from '../../components/bottombar/Bottombar'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext/Context'

export default function BookForm() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [snippet, setSnippet] = useState('')
  const [image, setImage] = useState(null)
  let [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)

  const { user } = useContext(UserContext)

  const cat = ['Art', 'Biography', 'Business', 'Comic', 'Computer', 'Craft', 'Education', 'Entertainment', 'Fiction', 'Health', 'History', 'Horror', 'Kid', 'Literature', 'Math', 'Medical', 'Mysteries', 'Parenting', 'Religion', 'Romance', 'Sci-Fi', 'Science', 'Sports', 'Teen', 'Travel', 'Western']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const newBook = {
      title, author, snippet, image: image.name, category, userId: user._id
    }
    if(image) {
      const data = new FormData()
      const imageName = Date.now() + image.name
      data.append('name', imageName)
      data.append('image', image)
      try {
        const res = await axios.post('https://devtruth-bookly.herokuapp.com/api/books/upload', data)
        newBook.image = res.data.path
        try {
          await axios.post('https://devtruth-bookly.herokuapp.com/api/books', newBook, {
            headers: {
              "x-auth-token": user.token
            }
          })
          setLoading(false)
        }catch(ex) {}
      }catch(ex) {}
    } 
    navigate(`/user/${user._id}`)
  }

  const handleCatSelect = (e) => {
    e.target.classList.toggle('isSelected')
    category.includes(e.target.textContent) ? category = category.filter(cat => cat !== e.target.textContent) : category.push(e.target.textContent)
    setCategory(category)
  }

  return (
    <>
    <div className="bookForm">
      <h3>Add A New Book</h3>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input className='bookFormInput' type="text" placeholder='title' required name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input className='bookFormInput' type="text" placeholder='author' required name='author' value={author} onChange={(e) => setAuthor(e.target.value)}/>
        <textarea className='bookFormText' required placeholder='snippet' name="snippet" value={snippet} onChange={(e) => setSnippet(e.target.value)}></textarea>
        <div className="bookFormCat">
        <p>Select Categories</p>
        <div className='cat'>
          {cat.map((cat, index) => (
            <p id={cat} key={index} onClick={handleCatSelect}>{cat}</p>
          ))}
        </div>
        </div>
        <div className="bookFormImageDiv">
          <label className='bookFormFileLabel' htmlFor="image"><i className="fa-solid fa-image"></i></label>
          <input className='bookFormFile' type="file" name='image' id='image' required onChange={(e) => setImage(e.target.files[0])} />
          {image && <img className="bookFormImage" src={URL.createObjectURL(image)} alt="" />}
        </div>
        <input className='bookFormButton' type="submit" value='submit' disabled={loading} />
      </form>
    </div>
    <Bottombar>
        <Link to={`/user/${user._id}`} className='bottombarLink'>
          <i className="fa-solid fa-user"></i>
          <p>profile</p>
        </Link>
      </Bottombar>
    </>
  )
}