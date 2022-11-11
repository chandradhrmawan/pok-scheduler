/* eslint new-cap: "off", global-require: "off" */
import { Sequelize } from "sequelize";
import { db } from "../config/database/database.js"
const tempRincianKegiatan = db.define('tempRincianKegiatan', {
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
    NOITEM1: {
        type: Sequelize.STRING(100),
        field: 'NOITEM1',
        allowNull: true
    },
    NAMA_KEGIATAN: {
        type: Sequelize.STRING(100),
        field: 'NAMA_KEGIATAN',
        allowNull: true
    },
    VOLUME_KEGIATAN: {
        type: Sequelize.NUMBER,
        field: 'VOLUME_KEGIATAN',
        allowNull: true
    },
    SATUAN: {
        type: Sequelize.STRING,
        field: 'SATUAN',
        allowNull: true
    },
    JUMLAH_BIAYA: {
        type: Sequelize.NUMBER,
        field: 'JUMLAH_BIAYA',
        allowNull: true
    },
    SUMBER_DANA: {
        type: Sequelize.STRING,
        field: 'SUMBER_DANA',
        allowNull: true
    },
    CARA_BAYAR: {
        type: Sequelize.STRING,
        field: 'CARA_BAYAR',
        allowNull: true
    },
    JENIS_KONTRAK: {
        type: Sequelize.STRING,
        field: 'JENIS_KONTRAK',
        allowNull: true
    },
    KET: {
        type: Sequelize.STRING,
        field: 'KET',
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
    tableName: 'temp_rincian_kegiatan',
    timestamps: false
});
export {
    tempRincianKegiatan
}