const mysql = require('mysql');

class smsModal {
    constructor() {

        this.con = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        });

        this.con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    getAllSMS() {
        const sql = `SELECT * FROM sms `

        return new Promise((resolve, reject) => {
            this.con.query(sql, function (err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }

    sendSMS(sms) {
        return new Promise((resolve, reject) => {

            if (this.isSMSValid) {
                const sql = `
                    INSERT INTO sms (fromNumber, toNumber,content,date,status) 
                    VALUES ('${sms.from}', '${sms.to}', '${sms.content}', '${sms.date}', '${sms.status}')
                `;

                this.con.query(sql, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    console.log("1 record inserted");
                    sms.id = result.insertId;
                    resolve(sms)
                });
            } else {
                reject(err)
            }
        })
    }

    isSMSValid(sms) {
        if (!sms.from.match(/^05\d([-]{0,1})\d{7}$/)) {
            return { valid: false, msg: 'phone from is not valid' };
        }
        if (!sms.to.match(/^05\d([-]{0,1})\d{7}$/)) {
            return { valid: false, msg: 'phone to is not valid' };
        }
        if (sms.content === '') {
            return { valid: false, msg: 'content is not valid' };
        }
        return { valid: true };
    }
}

module.exports = new smsModal();
