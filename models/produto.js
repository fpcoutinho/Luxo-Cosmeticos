const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor, insira um nome."],
      minlength: [3, "O nome deve ter no mínimo 3 caracteres."],
      maxlength: [100, "O nome deve ter no máximo 100 caracteres."],
    },
    valor: {
      type: Number,
      required: [true, "Por favor, insira um valor."],
      min: [0, "O valor deve ser maior ou igual a 0."],
    },
    descricao: {
      type: String,
      required: [true, "Por favor, insira uma descrição."],
      minlength: [3, "A descrição deve ter no mínimo 3 caracteres."],
      maxlength: [100, "A descrição deve ter no máximo 100 caracteres."],
    },
    imagemUrl: {
      type: String,
      required: [true, "Por favor, insira uma url de uma imagem."],
    },
  },
  { timestamps: true }
);

ProdutoSchema.virtual("url").get(function () {
  return `/produto/${this._id}`;
});

module.exports = mongoose.model("Produto", ProdutoSchema);
