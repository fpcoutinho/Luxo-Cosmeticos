const { Router } = require('express')
const userController = require('../controllers/userController')

const router = Router()

router.get('/', userController.get_all_users)
router.get('/:id', userController.get_user)
router.put('/:id', userController.update_user)
router.delete('/:id', userController.delete_user)

module.exports = router
