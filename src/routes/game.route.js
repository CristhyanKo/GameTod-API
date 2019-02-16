const express = require('express')
const router = express.Router()
const controller = require('../controllers/game.controller')
const auth = require('../services/auth.service')

router.get('/', auth.authorize, controller.get)
router.post('/', auth.authorize, controller.post)

router.get('/:id', auth.authorize, controller.getById)
router.put('/:id', auth.authorize, controller.put)
router.delete('/:id', auth.authorize, controller.delete)

module.exports = router