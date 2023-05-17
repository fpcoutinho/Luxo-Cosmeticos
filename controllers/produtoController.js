const produto_cria_get = (req, res) => {
  res.render("produto_cria", { css: "form.css" });
};

const produto_cria_post = async (req, res) => {
  res.send("produto_post");
};

const produto_details = async (req, res) => {
  res.render("produto_details", { css: "form.css" });
};

module.exports = {
  produto_cria_get,
  produto_cria_post,
  produto_details,
};
