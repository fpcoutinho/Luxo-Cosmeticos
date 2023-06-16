const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PedidoSchema = new Schema(
  {
    User: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, insira um usuário.'],
    },
    Produtos: {
      type: Array,
      required: [true, 'Por favor, insira um produto.'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Pedido', PedidoSchema)
