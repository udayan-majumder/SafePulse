const express = require('express')
const router = express.Router()
const {LoginUser} = require('../controllers/login')

router.post('/login',LoginUser)

module.exports = router