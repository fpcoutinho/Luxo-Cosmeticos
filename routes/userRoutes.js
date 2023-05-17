const { Router } = require("express");
const produtoController = require("../controllers/userController");

const router = Router();

router.get("/config", produtoController.user_config_get);

module.exports = router;
