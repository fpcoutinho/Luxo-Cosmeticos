const { Router } = require('express')
const produtoController = require('../controllers/produtoController')
const upload = require('../middleware/multer')

const router = Router()

// GETS
router.get('/', produtoController.produto_getAll)

router.get('/categoria/:categoria', produtoController.produto_Filter)

router.get('/genero/:genero', produtoController.produto_Filter)

router.get('/marca/:marca', produtoController.produto_Filter)

// CRUD

router.get('/:id', produtoController.produto_details)

router.post('/', upload.single('file'), produtoController.produto_cria_post)

router.put('/:id', upload.single('file'), produtoController.produto_update)

router.delete('/:id', produtoController.produto_delete)

module.exports = router
