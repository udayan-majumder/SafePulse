const express= require('express')
const router = express.Router()
const {ActiveSosTrigger} = require('../services/sostrigger')
const {AuthUserDetails} = require('../middleware/AuthDetails')


router.post('/sendsos',AuthUserDetails,ActiveSosTrigger);

module.exports = router