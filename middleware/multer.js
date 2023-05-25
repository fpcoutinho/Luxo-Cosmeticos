const multer = require('multer')
const path = require('path')

// Set storage engine
const upload = multer({ dest: 'uploads/' })

module.exports = upload
