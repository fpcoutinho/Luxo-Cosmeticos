const mongoose = require('mongoose')
const { isEmail, isDate } = require('validator')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const { DateTime } = require('luxon')

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, insira um nome.'],
      minlength: [3, 'O nome deve ter no mínimo 3 caracteres.'],
      maxlength: [100, 'O nome deve ter no máximo 100 caracteres.'],
    },
    surname: {
      type: String,
      required: [true, 'Por favor, insira um sobrenome.'],
      minlength: [3, 'O sobrenome deve ter no mínimo 3 caracteres.'],
      maxlength: [100, 'O sobrenome deve ter no máximo 100 caracteres.'],
    },
    email: {
      type: String,
      required: [true, 'Por favor insira um e-mail.'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Por favor insira um e-mail válido.'],
    },
    dataNascimento: {
      type: Date,
      required: [true, 'Por favor insira uma data de nascimento.'],
      validate: [isDate, 'Por favor insira uma data de nascimento válida.'],
    },
    password: {
      type: String,
      required: [true, 'Por favor insira uma senha.'],
      minlength: [6, 'A senha deve ter no mínimo 6 caracteres.'],
      maxlength: [100, 'A senha deve ter no máximo 100 caracteres.'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) return user
    throw Error('Senha incorreta.')
  }
  throw Error('E-mail incorreto.')
}

UserSchema.virtual('fullname').get(function () {
  return `${this.name} ${this.surname}`
})

UserSchema.virtual('url').get(function () {
  return `/user/${this._id}`
})

UserSchema.virtual('extenso').get(function () {
  return {
    dataNascimento: DateTime.fromJSDate(this.dataNascimento, {
      zone: 'utc',
      lang: 'pt',
    }).toLocaleString(DateTime.DATE_FULL),
  }
})

UserSchema.virtual('formatted').get(function () {
  return {
    dataNascimento: DateTime.fromJSDate(this.dataNascimento, {
      zone: 'utc',
    }).toFormat('yyyy-MM-dd'),
  }
})

module.exports = mongoose.model('User', UserSchema)
