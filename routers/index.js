import express from "express";
import {
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
} from "../controller/pokController.js";
const router = express.Router();

//send data to sidako
router.get('/pok/sidako/uploaded-pok', uploadedPok);
router.get('/pok/sidako/approved-pok', approvedPok);

//generate report pok
router.get('/pok/get', getPok);
router.get('/pok/lembar-kontrol/generate', generateLembarKontrol);
router.get('/pok/struktur-kegiatan/generate', generateStrukturKegiatan);
router.get('/pok/lingkup-kegiatan/generate', generateLingkupKegiatan);
router.get('/pok/rincian-kegiatan/generate', generateRincianKegiatan);

//generate report pok sync
router.get('/pok/lembar-kontrol/generate-sync', generateLembarKontrolSync);

//check no row data
router.get('/pok/regenerate/:tipe', regenerateReport);
router.get('/pok/lingkup-kegiatan/bulkGenerate', generateLingkupKegiatanBulk);
router.get('/pok/lembar-kontrol/bulkGenerate', generateLembarKontrolBulk);

//delete data pok
router.delete('/pok/delete', deletePok);
export { router }
