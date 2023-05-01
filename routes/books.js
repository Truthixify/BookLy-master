const express = require('express')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const Book = require('../models/Book')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const authMiddleware = require('../middleware/auth')
const adminMiddleware = require('../middleware/admin')

cloudinary.config({ 
  cloud_name: 'devtruth', 
  api_key: '186516598492836', 
  api_secret: 'hEFx5iJH4LhyDATmrXGExYrnXcU' 
})
 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
    format: async (req, file) => { 'png', 'jpeg', 'jpg'},
    public_id: (req, file) => req.body.nam
  }
})

const upload = multer({storage})

const router = express.Router()

//UPLOAD BOOK IMAGE
router.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).send(req.file)
})

//ROUTES

//CREATE A BOOK
router.post('/', authMiddleware, async (req, res) => {
  const book = await Book.findOne({ title: req.body.title })
  if(book) return res.status(400).send('The book already exists')

  try {
    const book = new Book({...req.body})
    await book.save()

    res.status(200).send(book)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

//UPDATE A BOOK
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if(!book) return res.status(404).send('Book not found and cannot be updated')
  
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new: true})
  
      res.status(200).send(book)
    }catch(ex) {
      res.status(500).send(ex)
    }
  }catch {
    res.status(500).send(ex)
  }
  
})

//DELETE A BOOK
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id)
    res.status(200).send('The book has been deleted')
  }catch(ex) {
    res.status(500).send(ex)
  }
})

//GET ALL BOOKS BY A PARTICULAR USER
/* router.get('/userbook:id', authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ userid: id })
    res.status(200).send(books)
  }catch(ex) {
    res.status(500).send(ex)
  }
}) */

//GET A BOOK
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if(!book) return res.status(404).send("Book doesn't exist")
  
    res.status(200).send(book)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

//GET ALL BOOKS
router.get('/', async (req, res) => {
  try {
    const categoryParams = req.query.category
    const titleParams = req.query.title
    const authorParams = req.query.author

    let books

    if(categoryParams && titleParams && authorParams) books = await Book.find({
      category: categoryParams,
      title: titleParams,
      author: authorParams
    }).sort('-createdAt')
    else if(categoryParams && titleParams) books = await Book.find({
      category: categoryParams,
      title: titleParams
    }).sort('-createdAt')
    else if(categoryParams && authorParams) books = await Book.find({
      category: categoryParams,
      author: authorParams
    }).sort('-createdAt')
    else if(titleParams && authorParams) books = await Book.find({
      title: titleParams,
      author: authorParams
    }).sort('-createdAt')
    else if(categoryParams) books = await Book.find({category: {
      $in: [categoryParams]
    }}).sort('-createdAt')
    else if(titleParams) books = await Book.find({title: titleParams}).sort('-createdAt')
    else if(authorParams) books = await Book.find({author: authorParams}).sort('-createdAt')
    else books = await Book.find().sort('-createdAt')

    res.status(200).send(books)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

module.exports = router