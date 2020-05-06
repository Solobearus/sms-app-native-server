const database = require('../models/smsModel');
const PDFDocument = require('pdfkit');
const pdfMakePrinter = require('pdfmake/src/printer');

exports.getAllSMS = function (req, res) {
    database.getAllSMS()
        .then((result) => res.json({ sucess: true, msg: "success", result }))
        .catch(err => res.status(500).json({ sucess: false, msg: err }))
};

exports.sendSMS = function (req, res) {
    const { sms } = req.body;
    const status = Math.round(Math.random());
    sms.status = status;

    database.sendSMS(sms, res)
};

exports.downloadPDF = function (req, res) {

    const cb = (result) => {

        const columns = ['ID', 'From', 'To', 'Content', 'Date', 'Status']
        const tableData = result.map(item => {
            let { date, id, from, to, content, status } = item
            date = new Date(+date).toLocaleDateString('en-US')
            status = status ? 'success' : 'failure'
            return [id, from, to, content, date, status]
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