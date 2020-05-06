const database = require('../models/smsModel');
const PDFDocument = require('pdfkit');
const pdfMakePrinter = require('pdfmake/src/printer');

exports.allSMS = function (req, res) {
    const cb = (result) => res.json({ sucess: true, msg: "success", result });
    database.allSMS(cb);
};

exports.sendSMS = function (req, res) {
    const { sms } = req.body;
    const status = Math.round(Math.random());
    sms.status = status;

    database.sendSMS(sms, res)
};

exports.downloadPDF = function (req, res) {

    const cb = (result) => {


        const docDefinition = {
            content: [
                {
                    style: 'tableExample',
                    table: {
                        body: [
                            ['ID', 'From', 'To', 'Content', 'Date', 'Status'],
                            ...result.map(item => Object.keys(item).map(key => {
                                if (key === 'date') {
                                    return new Date(+item[key]).toLocaleDateString('en-US')
                                }
                                if (key === 'status') {
                                    return item[key] ? 'success' : 'failure'
                                }
                                return item[key];
                            }))
                        ]
                    }
                }
            ]
        };

        generatePdf(docDefinition, (response) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.send(response); // Buffer data
        });
    }

    database.allSMS(cb);
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