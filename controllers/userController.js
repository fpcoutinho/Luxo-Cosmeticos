const User = require('../models/user')

const get_all_users = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 })
    res.status(200).json(users)
  } catch (err) {
    res.status(404).json({ message: 'Não há usuários no banco de dados.' })
  }
}

const get_user = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json({ message: 'Usuário não encontrado.' })
  }
}

module.exports = {
  get_all_users,
  get_user,
}
