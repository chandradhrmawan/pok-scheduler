import { errorMessage, statusCode, successMessage } from "../helpers/statusHelpers.js"
import {
    getDataPok, saveRencanaKerja, delPok, getDataPokF, uploadedPokService, approvedPokService, generateLembarService,
    generateStrukturKegiatanService
} from "../services/pokServices.js";
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs';
import moment from "moment";
import pdf from "html-pdf";
moment.locale('id');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPok = async (req, res) => {
    try {
        let { revUid } = req.query
        setTimeout(async function () {
            await getDataPok(revUid);
        }, 1000);

        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        console.log(err)
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const getPokF = async (req, res) => {
    try {
        // let { revUid,kodeKegiatan } = req.query
        let revUid = 'c110bee2-9963-4e5c-99a4-ea105eddfe62'
        let kodeKegiatan = '07.2409'
        // setTimeout(async function () {
        //     await getDataPokF(revUid, kodeKegiatan);
        // }, 1000);

        let response = await getDataPokF(revUid, kodeKegiatan);

        return res.status(statusCode.success).json(successMessage(response))
    } catch (err) {
        console.log(err)
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const postRencanaKerja = async (req, res) => {
    try {
        let data = req.body
        let dataRk = await saveRencanaKerja(data);
        return res.status(statusCode.success).json(successMessage(dataRk))
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const deletePok = async (req, res) => {
    try {
        let dataPok = [{
            revUid: '6f8b5ba7-96a9-4b1c-b442-2cf2013bded1',
            pokUid: '008e85de-3902-4268-bba4-f00d7633086c',
        }, {
            revUid: 'fb64e1fd-acc1-481d-94bc-44ad495143df',
            pokUid: 'fc1af4b8-8641-44ad-938b-f30ecf2c17b1',
        }, {
            revUid: 'b46f43fd-a7de-4f21-a522-fcb91c8dcc87',
            pokUid: 'ff42d773-bee4-4c1f-8852-09fea7aeefea',
        }]
        await delPok(dataPok);
        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const uploadedPok = async (req, res) => {
    try {
        let data = req.query
        let result = await uploadedPokService(data);
        return res.status(statusCode.success).json(successMessage(result))
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err))
    }
}

const approvedPok = async (req, res) => {
    try {
        let data = req.query
        let result = await approvedPokService(data);
        return res.status(statusCode.success).json(successMessage(result))
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err))
    }
}

const generateLembarKontrol = async (req, res) => {
    try {
        let data = req.query
        let result = await generateLembarService(data);
        return res.status(statusCode.success).json(successMessage(result))
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err))
    }
}

const printHtml = async (req, res) => {
    try {
        const passengers = [
            {
                name: "Joyce",
                flightNumber: 7859,
                time: "18h00",
            },
            {
                name: "Brock",
                flightNumber: 7859,
                time: "18h00",
            },
            {
                name: "Eve",
                flightNumber: 7859,
                time: "18h00",
            },
        ];
        const filePath = path.join(__dirname, "../views/print.ejs")
        ejs.renderFile(filePath, { passengers }, (err, html) => {
            if (err) {
                return res.send('Error Load Data Html')
            }
            return res.send(html)
        })
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err.toString()))
    }
}


const printHtmlPdf = (req, res) => {
    try {
        const filePath = path.join(__dirname, "../views/print.ejs")
        ejs.renderFile(filePath, { passengers }, (err, html) => {

            if (err) {
                return res.send('Error Load Data Html')
            }

            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };

            let reportName = `report_${Date.now()}.pdf`
            let path = `./temp/${reportName}`
            pdf.create(html, options).toFile(path, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    // res.send("File created successfully");
                    var data = fs.readFileSync(path);
                    res.contentType("application/pdf");
                    res.send(data);

                    fs.unlink(path, (error) => {
                        if (error) {
                            return console.error('error write file', error.toString())
                        }
                    })
                }
            });

        })
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err.toString()))
    }
}

const generateStrukturKegiatan = async (req, res) => {
    try {
        let { revUid } = req.query
        setTimeout(async function () {
            await generateStrukturKegiatanService(revUid);
        }, 1000);

        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        console.log(err)
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

export {
    getPok,
    postRencanaKerja,
    deletePok,
    getPokF,
    uploadedPok,
    approvedPok,
    generateLembarKontrol,
    printHtml,
    printHtmlPdf,
    generateStrukturKegiatan
}