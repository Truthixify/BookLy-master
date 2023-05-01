const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const path = require('path')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const bookRoute = require('./routes/books')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data: blob:"],
      "script-src": ["'self'", "https: data:"],
      "connect-src": ["'self'", "https: data:"]
    }
  })
)
app.use(compression())
dotenv.config()

app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('connected to db successfully'))
.catch(err => console.log(err))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/books', bookRoute)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

const port = process.env.PORT || 3000

app.listen(port, console.log(`Listening to server at port ${port}`))