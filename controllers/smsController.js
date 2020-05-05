var database = require('../models/smsModel');

exports.allSMS = function (req, res) {
    database.allSMS(res);
};

exports.sendSMS = function (req, res) {
    const { sms } = req.body;
    const status = Math.round(Math.random());
    sms.status = status;

    database.sendSMS(sms,res)
};