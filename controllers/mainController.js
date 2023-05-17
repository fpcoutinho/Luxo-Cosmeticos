const Produto = require("../models/produto");

exports.get = async (req, res) => {
  const produtos = await Produto.find();
  res.render("home", { css: "home.css", produtos });
};

exports.sobre = (req, res) => {
  res.render("sobre", { css: "sobre.css" });
};
