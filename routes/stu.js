
const express = require('express');
const studentCtrl = require('../control/studentCtrl');
const router = express.Router();
router.route('/stu')
                    .post(studentCtrl.add)
                    .get(studentCtrl.find)
module.exports = router;