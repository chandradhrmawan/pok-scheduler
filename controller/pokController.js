import { errorMessage, statusCode, successMessage } from "../helpers/statusHelpers.js"
import { getDataPok, saveRencanaKerja } from "../services/pokServices.js";
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