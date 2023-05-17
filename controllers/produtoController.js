const Produto = require("../models/produto");
const fs = require("fs");

const handleErrors = (err) => {
  let errors = {
    nome: "",
    marca: "",
    volume: "",
    preco: "",
    categoria: "",
    genero: "",
    descricao: "",
    imagem: "",
  };

  // Validating all errors
  if (err.message) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const produto_cria_get = (req, res) => {
  res.render("produto_cria", { css: "form.css" });
};

const produto_cria_post = async (req, res) => {
  const { nome, marca, volume, preco, categoria, genero, descricao } = req.body;
  const file = req.file;

  try {
    const produto = await Produto.create({
      nome,
      marca,
      volume,
      preco,
      categoria,
      genero,
      descricao,
      imagem: file.path.slice(7, file.path.length),
    });
    res.status(200).json({ produto: produto._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const produto_details = async (req, res) => {
  const id = req.params.id;
  try {
    const produto = await Produto.findById(id);
    res.render("produto_details", { css: "form.css", produto });
  } catch (err) {
    res.status(404).json({ message: "Produto não encontrado" });
  }
};

const produto_getAll = async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ nome: 1 });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Algum erro ocorreu ao buscar todos os produtos",
    });
  }
};

const produto_delete = async (req, res) => {
  const id = req.params.id;
  try {
    const produto = await Produto.findById(id);
    fs.unlinkSync(produto.imagem);
    await Produto.findByIdAndDelete(id);
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    res.status(404).json({ message: "Produto não encontrado" });
  }
};
module.exports = {
  produto_cria_get,
  produto_cria_post,
  produto_details,
  produto_getAll,
  produto_delete,
};
