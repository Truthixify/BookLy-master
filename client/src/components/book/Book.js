import React from 'react'
import { Link } from 'react-router-dom'
import './book.css'

export default function Book({book, handleUrlChange, path, handleTextChange}) {
  return (
    <div className="book">
      <div className="bookImg">
        <Link to={'/book/'+book._id}>
          <img src={book.image} alt="" />
        </Link>
      </div>
      <div className="bookContent">
        <h4>Title: <span>{book.title}</span></h4>
        <div className="bookContentMain">
          <div className='bookContentMainAuthor'>
          <h4>Author: <Link to={path} 
                        onClick={() => {
                          handleUrlChange('?author='+book.author)
                          handleTextChange('See books filtered by author')
                        }
                        }
                        >{book.author}
                        </Link></h4>
          </div>
          { book.category && <div className='bookContentMainCat'>
            <h4>Categories: </h4>
            <div>
            {book.category.map(category => (
              <Link to={path} key={category} 
                onClick={() => {
                  handleUrlChange('?category='+category)
                  handleTextChange('See books filtered by category')
                  }}
                  >{category}
                  </Link>
            ))}
            </div>
          </div>}
          <div className='bookContentMainDate'>
            <p>Published On: <span>{new Date(book.createdAt).toDateString()}</span></p>
            <p>Updated On: <span>{new Date(book.updatedAt).toDateString()}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
