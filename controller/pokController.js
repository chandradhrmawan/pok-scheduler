import { errorMessage, statusCode, successMessage } from "../helpers/statusHelpers.js"
import { getDataPok, saveRencanaKerja } from "../services/pokServices.js";
import moment from "moment";
moment.locale('id');

const getPok = async (req, res) => {
    try {
        let { revUid } = req.query
        let dataPok = await getDataPok(revUid);
        return res.status(statusCode.success).json(successMessage(dataPok))
    } catch (err) {
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

export {
    getPok,
    postRencanaKerja
}