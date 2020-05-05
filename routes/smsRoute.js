var express = require('express');
var router = express.Router();

var smsController = require('../controllers/smsController');

router.get('/sms', smsController.allSMS);
router.post('/sms/send', smsController.sendSMS);

module.exports = router;
