const { Router } = require("express");
const mainController = require("../controllers/mainController");

const router = Router();

router.get("/", mainController.get);

//redirect to /
router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/sobre", mainController.sobre);

module.exports = router;
