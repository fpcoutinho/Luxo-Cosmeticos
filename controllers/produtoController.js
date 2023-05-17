const Produto = require("../models/produto");

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
  const { nome, marca, volume, preco, categoria, genero, descricao, imagem } =
    req.body;

  try {
    const produto = await Produto.create({
      nome,
      marca,
      volume,
      preco,
      categoria,
      genero,
      descricao,
      imagem,
    });
    res.status(200).json({ produto: produto._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const produto_details = async (req, res) => {
  res.render("produto_details", { css: "form.css" });
};

module.exports = {
  produto_cria_get,
  produto_cria_post,
  produto_details,
};
