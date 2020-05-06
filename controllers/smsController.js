const smsModal = require('../models/smsModel');
const pdfMakePrinter = require('pdfmake/src/printer');

exports.getAllSMS = function (req, res) {
    smsModal.getAllSMS()
        .then(result => res.json({ sucess: true, msg: "success", result }))
        .catch(err => res.status(500).json({ sucess: false, msg: err }))
};

exports.sendSMS = function (req, res) {
    const { sms } = req.body;
    const status = Math.round(Math.random());
    sms.status = status;

    smsModal.sendSMS(sms)
        .then(result => res.json({ sucess: true, msg: "success", result }))
        .catch(err => res.status(500).json({ sucess: false, msg: err }))
};

exports.downloadPDF = function (req, res) {
    smsModal.getAllSMS()
        .then(result => {

            const columns = ['ID', 'From', 'To', 'Content', 'Date', 'Status']
            const tableData = result.map(item => {

                let { id, fromNumber, toNumber, content, date, status } = item;
                date = new Date(+date).toLocaleDateString('en-US');
                status = status ? 'success' : 'failure';
                return [id, fromNumber, toNumber, content, date, status];
            })

            const docDefinition = {
                content: [
                    {
                        style: 'tableExample',
                        table: {
                            body: [
                                columns,
                                ...tableData
                            ]
                        }
                    }
                ]
            }

            generatePdf(docDefinition, (response) => {
                res.setHeader('Content-Type', 'application/pdf');
                res.send(response);
            });
        })
        .catch(err => res.status(500).json({ sucess: false, msg: err }))
};

function generatePdf(docDefinition, callback) {
    try {
        const fontDescriptors = {
            Roboto: { normal: Buffer.from(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64') }
        };

        const printer = new pdfMakePrinter(fontDescriptors);
        const doc = printer.createPdfKitDocument(docDefinition);

        let chunks = [];

        doc.on('data', (chunk) => {
            chunks.push(chunk);
        });

        doc.on('end', () => {
            callback(Buffer.concat(chunks));
        });

        doc.end();

    } catch (err) {
        throw (err);
    }
};