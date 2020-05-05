class Database {
    constructor() {
        this.smses = [
            {
                sentFrom: '0504445555',
                sentTo: '0504441111',
                content: 'We got a problem huston!',
                sentDate: '01/01/20 00:00:00',
                status: true,
            }
        ];
    }

    allSMS() {
        return this.smses;
    }

    sendSMS(sms) {
        if (this.validateSms) {
            this.smses.push(sms);
            return true;
        } else {
            return false;
        }
    }

    validateSms(sms) {
        return true;
    }
}

const database = new Database();
module.exports = database;