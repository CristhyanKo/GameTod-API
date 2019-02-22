const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
const auth = require('../services/auth.service')

router.post('/authenticate', controller.authenticate)
router.post('/refresh-token', controller.refreshToken)
router.post('/validate-token', controller.verifyToken)

router.get('/', auth.authorize, controller.get)
router.post('/', controller.post)

router.get('/:id', auth.authorize, controller.getById)
router.put('/:id', auth.authorize, controller.put)
router.delete('/:id', auth.authorize, controller.delete)


module.exports = router