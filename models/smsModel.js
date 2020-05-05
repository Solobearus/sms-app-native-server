const mysql = require('mysql');

class Database {
    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            port: 3306,
            database: 'sms',
            user: "root",
            password: ""
        });

        this.con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    allSMS(res) {
        const sql = `SELECT * FROM sms `;

        this.con.query(sql, function (err, result) {
            if (err) throw err;
            res.json({ sucess: true, msg: "success", result });
        });
    }

    sendSMS(sms, res) {

        if (this.validateSms) {
            const sql = `
                INSERT INTO sms (fromNumber, toNumber,content,date,status) 
                VALUES ('${sms.from}', '${sms.to}', '${sms.content}', '${sms.date}', '${sms.status}')
            `;

            this.con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                sms.id = result.insertId;
                res.json({ sucess: true, msg: "success", sms });
            });
        } else {
            res.status(400).json({ sucess: false, msg: "bad request" });
        }
    }

    validateSms(sms) {
        return true;
    }
}

module.exports = new Database();
