import express from "express";
import {
    getPok, postRencanaKerja, deletePok, getPokF, uploadedPok, approvedPok, generateLembarKontrol,
    printHtml, printHtmlPdf, generateStrukturKegiatan
} from "../controller/pokController.js";
const router = express.Router();

router.get('/pok/get', getPok);
router.get('/pok/rencana-kerja/sum-kode-kegiatan', getPokF);
router.post('/rencana-kerja/save', postRencanaKerja);
router.delete('/pok/delete', deletePok);
router.get('/pok/lembar-kontrol/generate', generateLembarKontrol);

router.get('/pok/struktur-kegiatan/generate', generateStrukturKegiatan);

router.get('/printHtml', printHtml)

router.get('/printHtmlPdf', printHtmlPdf)

router.get('/pok/sidako/uploaded-pok', uploadedPok);
router.get('/pok/sidako/approved-pok', approvedPok);
export { router }
