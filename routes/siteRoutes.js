const { Router } = require("express");
const produtoController = require("../controllers/produtoController");

const router = Router();

router.get("/cria", produtoController.produto_cria_get);

router.get("/:id", produtoController.produto_details);

module.exports = router;
