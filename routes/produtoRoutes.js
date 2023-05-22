const { Router } = require('express')
const produtoController = require('../controllers/produtoController')
const upload = require('../middleware/multer')

const router = Router()

router.get('/getAll', produtoController.produto_getAll)

router.get('/:id', produtoController.produto_details)

router.post('/cria', upload.single('file'), produtoController.produto_cria_post)

router.delete('/:id', produtoController.produto_delete)

module.exports = router
