const express = require('express')
const router = express.Router()
const {GetLoginDetails}  =require('../controllers/GetDetails')


router.get('/getlogindetails', GetLoginDetails)

module.exports = router
