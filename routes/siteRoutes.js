const { Router } = require("express");

const router = Router();

router.get("/cria", (req, res) => {
  res.render("produto");
});

router.get("/:id", (req, res) => {
  res.render("produto");
});

module.exports = router;
