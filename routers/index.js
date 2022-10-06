import express from "express";
import { getPok, postRencanaKerja, deletePok, getPokF, uploadedPok, approvedPok } from "../controller/pokController.js";
const router = express.Router();

router.get('/pok/get', getPok);
router.get('/pok/rencana-kerja/sum-kode-kegiatan', getPokF);
router.post('/rencana-kerja/save', postRencanaKerja);
router.delete('/pok/delete', deletePok);

router.get('/pok/sidako/uploaded-pok', uploadedPok);
router.get('/pok/sidako/approved-pok', approvedPok);
export { router }
