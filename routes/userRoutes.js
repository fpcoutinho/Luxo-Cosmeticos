const { Router } = require('express')
const produtoController = require('../controllers/userController')

const router = Router()

router.get('/', produtoController.get_all_users)
router.get('/:id', produtoController.get_user)

module.exports = router
