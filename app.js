require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes')
const produtoRoutes = require('./routes/produtoRoutes')
const userRoutes = require('./routes/userRoutes')

const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express()

// middleware
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PWD}@banquinho.b9frcyb.mongodb.net/node-auth`
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// routes
app.get('/', (req, res) =>
  res.send(
    'Bem vindo à API da Luxo-Cosméticos.\n\nAcesse /auth para autenticação.\n\nAcesse /user para visualizar os usuários.\n\nAcesse /produto para visualizar os produtos.'
  )
)
app.use('/auth', authRoutes)
app.use('/user', requireAuth, userRoutes)
app.use('/produto', produtoRoutes)
