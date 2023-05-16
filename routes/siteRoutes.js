const { Router } = require("express");

const router = Router();

router.get("/cria", (req, res) => {
  res.render("produto", { css: "produto.css" });
});

router.get("/:id", (req, res) => {
  res.render("produto", { css: "produto.css" });
});

module.exports = router;
