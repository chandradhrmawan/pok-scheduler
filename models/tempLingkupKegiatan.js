/* eslint new-cap: "off", global-require: "off" */
import { Sequelize } from "sequelize";
import { db } from "../config/database/database.js"
const tempLingkupKegiatan = db.define('tempLingkupKegiatan', {
    ID: {
        type: Sequelize.NUMBER,
        field: 'ID',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    UID: {
        type: Sequelize.STRING(100),
        field: 'UID',
        allowNull: true
    },
    POK_UID: {
        type: Sequelize.STRING(100),
        field: 'POK_UID',
        allowNull: true
    },
    REV_UID: {
        type: Sequelize.STRING(100),
        field: 'REV_UID',
        allowNull: true
    },
    STATUS: {
        type: Sequelize.STRING(100),
        field: 'STATUS',
        allowNull: true
    },
    STATUS_DATA: {
        type: Sequelize.STRING(100),
        field: 'STATUS_DATA',
        allowNull: true
    },
    LVL: {
        type: Sequelize.STRING(100),
        field: 'LVL',
        allowNull: true
    },
    KODE_KEGIATAN: {
        type: Sequelize.STRING(100),
        field: 'KODE_KEGIATAN',
        allowNull: true
    },
    NAMA_KEGIATAN: {
        type: Sequelize.STRING(100),
        field: 'NAMA_KEGIATAN',
        allowNull: true
    },
    LOKASI_KEGIATAN: {
        type: Sequelize.STRING(100),
        field: 'LOKASI_KEGIATAN',
        allowNull: true
    },
    SUMBER_DANA: {
        type: Sequelize.STRING(100),
        field: 'SUMBER_DANA',
        allowNull: true
    },
    ALOKASI_DANA: {
        type: Sequelize.NUMBER,
        field: 'ALOKASI_DANA',
        allowNull: true
    },
    SASARAN_VOLUME_SNF: {
        type: Sequelize.NUMBER,
        field: 'SASARAN_VOLUME_SNF',
        allowNull: true
    },
    SASARAN_VOLUME: {
        type: Sequelize.NUMBER,
        field: 'SASARAN_VOLUME',
        allowNull: true
    },
    SASARAN_SATUAN: {
        type: Sequelize.STRING,
        field: 'SASARAN_SATUAN',
        allowNull: true
    },
    NOMOR_RUAS: {
        type: Sequelize.STRING,
        field: 'NOMOR_RUAS',
        allowNull: true
    },
    PANJANG_RUAS: {
        type: Sequelize.NUMBER,
        field: 'PANJANG_RUAS',
        allowNull: true
    },
    STS_JALAN: {
        type: Sequelize.STRING,
        field: 'STS_JALAN',
        allowNull: true
    },
    INDIKASI_LOKASI_NAMA_JEMBATAN: {
        type: Sequelize.STRING,
        field: 'INDIKASI_LOKASI_NAMA_JEMBATAN',
        allowNull: true
    },
    KOORDINAT_X_AWAL: {
        type: Sequelize.STRING,
        field: 'KOORDINAT_X_AWAL',
        allowNull: true
    },
    KOORDINAT_X_AKHIR: {
        type: Sequelize.STRING,
        field: 'KOORDINAT_X_AKHIR',
        allowNull: true
    },
    KOORDINAT_Y_AWAL: {
        type: Sequelize.NUMBER,
        field: 'KOORDINAT_Y_AWAL',
        allowNull: true
    },
    KOORDINAT_Y_AKHIR: {
        type: Sequelize.STRING,
        field: 'KOORDINAT_Y_AKHIR',
        allowNull: true
    },
    PANJANG_PENANGANAN: {
        type: Sequelize.NUMBER,
        field: 'PANJANG_PENANGANAN',
        allowNull: true
    },
    LEBAR_PENANGANAN: {
        type: Sequelize.NUMBER,
        field: 'LEBAR_PENANGANAN',
        allowNull: true
    },
    JENIS_PENANGANAN: {
        type: Sequelize.STRING,
        field: 'JENIS_PENANGANAN',
        allowNull: true
    },
    KET_REVISI: {
        type: Sequelize.STRING,
        field: 'KET_REVISI',
        allowNull: true
    },
    BOLD: {
        type: Sequelize.STRING,
        field: 'BOLD',
        allowNull: true
    },
    PERIODE: {
        type: Sequelize.STRING,
        field: 'PERIODE',
        allowNull: true
    }
}, {
    tableName: 'temp_lingkup_kegiatan',
    timestamps: false
});
export {
    tempLingkupKegiatan
}