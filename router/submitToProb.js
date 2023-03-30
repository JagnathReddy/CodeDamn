const express = require('express')
const router=express.Router();
const submit=require('./../controller/submit');

router.route('/').post(submit.sub).get(submit.getRanks);

module.exports = router;