import express from "express";
// import { getBooksByGenre, getMultiBooksByGenre } from "../controller/bookController.js";
// import { postBooking, getBooking } from "../controller/bookingController.js";
import { getPok, postRencanaKerja } from "../controller/pokController.js";
const router = express.Router();

// router.get('/books/get', getBooksByGenre);
// router.get('/books/multi/get', getMultiBooksByGenre);

// router.post('/booking/save', postBooking);
// router.get('/booking/get', getBooking);

router.get('/pok/get', getPok);
router.post('/rencana-kerja/save', postRencanaKerja);

export { router }
