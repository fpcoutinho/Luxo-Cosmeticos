const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Handle Errors
const handleErrors = (err) => {
  let errors = {
    name: '',
    surname: '',
    dataNascimento: '',
    email: '',
    password: '',
  }

  // Validating all errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  // Incorrect email
  if (err.message === 'E-mail incorreto.') {
    errors.email = 'Este e-mail não está cadastrado.'
  }

  // Incorrect password
  if (err.message === 'Senha incorreta.') {
    errors.password = 'Esta senha está incorreta.'
  }

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = 'Este e-mail já está cadastrado.'
  }

  return errors
}

// Create token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  })
}

// Authentication controller functions
const signup_post = async (req, res, next) => {
  const { name, surname, email, dataNascimento, password, isAdmin } = req.body
  try {
    const user = await User.create({
      name,
      surname,
      email,
      dataNascimento,
      password,
      isAdmin,
    })
    const token = createToken(user._id)
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    })
    res.status(201).json({ user: user._id })
  } catch (err) {
    console.log(err.message)
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

const login_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    })
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.status(200).json({ message: 'Usuário deslogado com sucesso!' })
}

module.exports = {
  signup_post,
  login_post,
  logout,
}
