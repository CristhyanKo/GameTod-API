const express = require('express')
const router = express.Router()
const controller = require('../controllers/game.controller')
const auth = require('../services/auth.service')

router.get('/', auth.authorize, controller.get)
router.post('/', auth.isAdmin, controller.post)

router.get('/:id', auth.authorize, controller.getById)
router.put('/:id', auth.isAdmin, controller.put)
router.delete('/:id', auth.isAdmin, controller.delete)

module.exports = router