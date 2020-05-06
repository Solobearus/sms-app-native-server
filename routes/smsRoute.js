const express = require('express');
const router = express.Router();

const smsController = require('../controllers/smsController');

router.get('/sms', smsController.getAllSMS);
router.get('/smspdf', smsController.downloadPDF);
router.post('/sms/send', smsController.sendSMS);

module.exports = router;
