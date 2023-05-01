const express = require('express')
const CryptoJS = require('crypto-js')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth')
const adminMiddleware = require('../middleware/admin')

const router = express.Router()

//ROUTES

//UPDATE A USER DETAILS
router.put('/:id', authMiddleware, async (req, res) => {
  const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC).toString()
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        password: hashedPassword
      }
    }, {new: true}).select('-password -admin -moderator')

    // const {password, admin, moderator, ...others} = user._doc
    res.status(200).send(user)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

//MAKE USER ADMIN
router.put('/admin/:id', adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        admin: true
      }
    }, {new: true}).select('-password -admin')
    res.status(200).send(user)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

//GET A USER
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -admin')
    res.status(200).send(user)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

//GET ALL USERS
router.get('/', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().sort('name').select('-password -admin')
    res.status(200).send(users)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

module.exports = router