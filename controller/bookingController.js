import { errorMessage, statusCode, successMessage } from "../helpers/statusHelpers.js"
import { getDetailBooks } from "../services/bookServices.js";
import store from 'store2'
import moment from "moment";
moment.locale('id');

const postBooking = async (req, res) => {
    try {
        let postData = req.body
        let errMsg = []
        let detailBook = await getDetailBooks(postData.cover_id)

        if (!detailBook['isFound']) errMsg.push('Book Not Found')
        if (!moment(postData['start_booking'], 'YYYY-MM-DD HH:mm:ss').isValid()) errMsg.push('Start Date Not Valid')
        if (!moment(postData['end_booking'], 'YYYY-MM-DD HH:mm:ss').isValid()) errMsg.push('End Date Not Valid')

        let diff = moment(postData['start_booking'], 'YYYY-MM-DD HH:mm:ss').diff(postData['end_booking'], 'YYYY-MM-DD HH:mm:ss')
        if(diff > 1) errMsg.push('Start Date Must Greater Than End Date')

        if (errMsg.length > 0) return res.status(statusCode.success).json(errorMessage(errMsg))

        let storeData = []
        postData['booking_id'] = store.get('bookData') ? store.get('bookData').length + 1 : 1
        storeData.push(postData)
        store.add('bookData', storeData)

        res.status(statusCode.success).json(successMessage(store.get('bookData')))
    } catch (err) {
        res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const getBooking = async (req, res) => {
    try {
        let bookData = store.get('bookData')
        res.status(statusCode.success).json(successMessage(bookData))
    } catch (err) {
        res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

export {
    postBooking,
    getBooking
}