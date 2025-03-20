const express = require('express')
const router = express.Router()
const {RegisterUser} = require('../controllers/register')

router.post('/register',RegisterUser)

module.exports = router