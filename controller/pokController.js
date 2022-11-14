import { errorMessage, statusCode, successMessage } from "../helpers/statusHelpers.js"
import {
    getDataPok,
    delPok,
    uploadedPokService,
    approvedPokService,
    generateLembarService,
    generateStrukturKegiatanService,
    regenerateReportLembarKontrol,
    generateLingkupKegiatanService,
    generateLingkupKegiatanBulkService,
    generateRincianKegiatanService,
    generateLembarKontrolBulkService
} from "../services/pokServices.js";
import moment from "moment";
moment.locale('id');

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
        let { revUid } = req.query
        setTimeout(async function () {
            await generateLembarService(revUid);
        }, 1000);

        return res.status(statusCode.success).json(successMessage())
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

const regenerateReport = async (req, res) => {
    try {
        let tipeReport = req.params.tipe || 'lembar-kontrol'

        if (tipeReport == 'lembar-kontrol') {
            setTimeout(async function () {
                await regenerateReportLembarKontrol();
            }, 1000);
        }
        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        console.log(err)
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const generateLingkupKegiatan = async (req, res) => {
    try {
        let { revUid } = req.query
        setTimeout(async function () {
            await generateLingkupKegiatanService(revUid);
        }, 1000);

        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        console.log(err)
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const generateLingkupKegiatanBulk = async (req, res) => {
    try {
        let { revUid } = req.query
        setTimeout(async function () {
            await generateLingkupKegiatanBulkService(revUid);
        }, 1000);

        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        console.log(err)
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const generateRincianKegiatan = async (req, res) => {
    try {
        let { revUid } = req.query
        setTimeout(async function () {
            await generateRincianKegiatanService(revUid);
        }, 1000);
        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        console.log(err)
        return res.status(statusCode.bad).json(errorMessage(err.toString()))
    }
}

const generateLembarKontrolSync = async (req, res) => {
    try {
        let { revUid } = req.query
        await generateLembarService(revUid);
        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err.toString()))
    }
}

const generateLembarKontrolBulk = async (req, res) => {
    try {
        let { revUid } = req.query
        setTimeout(async function () {
            await generateLembarKontrolBulkService(revUid);
        }, 1000);

        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        console.log(err)
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

export {
    getPok,
    deletePok,
    uploadedPok,
    approvedPok,
    generateLembarKontrol,
    generateStrukturKegiatan,
    regenerateReport,
    generateLingkupKegiatan,
    generateLingkupKegiatanBulk,
    generateRincianKegiatan,
    generateLembarKontrolSync,
    generateLembarKontrolBulk
}