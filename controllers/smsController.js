var database = require('../modals/smsModal');

exports.allSMS = function (req, res) {
    res.json(database.allSMS());
};

exports.sendSMS = function (req, res) {
    if (database.sendSMS(req.body.sms)) {
        res.json({ sucess: true, msg: "success" });
    } else {
        res.status(400).json({ sucess: false, msg: "bad request" });
    }
};