const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "Por favor, insira um nome."],
      minlength: [3, "O nome deve ter no mínimo 3 caracteres."],
      maxlength: [100, "O nome deve ter no máximo 100 caracteres."],
    },
    marca: {
      type: String,
      required: [true, "Por favor, insira uma marca."],
    },
    preco: {
      type: Number,
      required: [true, "Por favor, insira um valor."],
      min: [0, "O valor deve ser maior ou igual a 0."],
    },
    volume: {
      type: Number,
      required: [true, "Por favor, insira um volume."],
      min: [0, "O volume deve ser maior ou igual a 0."],
    },
    descricao: {
      type: String,
      required: [true, "Por favor, insira uma descrição."],
      minlength: [3, "A descrição deve ter no mínimo 3 caracteres."],
      maxlength: [100, "A descrição deve ter no máximo 100 caracteres."],
    },
    categoria: {
      type: String,
      required: [true, "Por favor, insira uma categoria."],
    },
    genero: {
      type: String,
      required: [true, "Por favor, insira um gênero."],
    },
    imagem: {
      data: Buffer,
      contentType: String,
      required: [true, "Por favor, insira uma imagem."],
    },
  },
  { timestamps: true }
);

ProdutoSchema.virtual("url").get(function () {
  return `/produto/${this._id}`;
});

module.exports = mongoose.model("Produto", ProdutoSchema);
