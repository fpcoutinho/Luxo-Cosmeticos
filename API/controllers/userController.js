const User = require('../models/user')

const get_all_users = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 })
    res.status(200).json(users)
  } catch (err) {
    res.status(404).json({ message: 'Não há usuários no banco de dados.' })
  }
}

// CRUD de user, menos o POST que já está em signup
const get_user = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json({ message: 'Usuário não encontrado.' })
  }
}

const update_user = async (req, res) => {
  const id = req.params.id
  const { name, surname, email, dataNascimento, password } = req.body

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, surname, email, dataNascimento, password },
      { new: true, runValidators: true }
    )
    res
      .status(200)
      .json({ usuário: user, message: 'Usuário atualizado com sucesso.' })
  } catch (err) {
    res.status(404).json({ message: 'Usuário não encontrado.' })
  }
}

const delete_user = async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findByIdAndDelete(id)
    res
      .status(200)
      .json({ usuário: user, message: 'Usuário deletado com sucesso.' })
  } catch (err) {
    res.status(404).json({ message: 'Usuário não encontrado.' })
  }
}

module.exports = {
  get_all_users,
  get_user,
  update_user,
  delete_user,
}
