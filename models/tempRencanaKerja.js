/* eslint new-cap: "off", global-require: "off" */
import { Sequelize } from "sequelize";
import { db } from "../config/database/database.js"
const tempRencanaKerja = db.define('tempRencanaKerja', {
    ID: {
        type: Sequelize.NUMBER,
        field: 'ID',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
    POK_REVISION_TYPE_UID: {
        type: Sequelize.STRING(100),
        field: 'POK_REVISION_TYPE_UID',
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
    BELANJA_PEGAWAI_OPERASIONAL: {
        type: Sequelize.NUMBER,
        field: 'BELANJA_PEGAWAI_OPERASIONAL',
        allowNull: true
    },
    BELANJA_BARANG_OPERASIONAL: {
        type: Sequelize.NUMBER,
        field: 'BELANJA_BARANG_OPERASIONAL',
        allowNull: true
    },
    BLNJ_BRG_NON_OP_NON_PEND: {
        type: Sequelize.NUMBER,
        field: 'BLNJ_BRG_NON_OP_NON_PEND',
        allowNull: true
    },
    BLNJ_BRG_NON_OP_PHLN: {
        type: Sequelize.NUMBER,
        field: 'BLNJ_BRG_NON_OP_PHLN',
        allowNull: true
    },
    BLNJ_BRG_NON_OP_SBSN: {
        type: Sequelize.NUMBER,
        field: 'BLNJ_BRG_NON_OP_SBSN',
        allowNull: true
    },
    BELANJA_MODAL_OPERASIONAL: {
        type: Sequelize.NUMBER,
        field: 'BELANJA_MODAL_OPERASIONAL',
        allowNull: true
    },
    BLNJ_MDL_NON_OP_NON_PEND: {
        type: Sequelize.NUMBER,
        field: 'BLNJ_MDL_NON_OP_NON_PEND',
        allowNull: true
    },
    BLNJ_MDL_NON_OP_PEND: {
        type: Sequelize.NUMBER,
        field: 'BLNJ_MDL_NON_OP_PEND',
        allowNull: true
    },
    BLNJ_MDL_NON_OP_PHLN: {
        type: Sequelize.NUMBER,
        field: 'BLNJ_MDL_NON_OP_PHLN',
        allowNull: true
    },
    BLNJ_MDL_NON_OP_SBSN: {
        type: Sequelize.NUMBER,
        field: 'BLNJ_MDL_NON_OP_SBSN',
        allowNull: true
    },
    JUMLAH_TOTAL: {
        type: Sequelize.NUMBER,
        field: 'JUMLAH_TOTAL',
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
    tableName: 'temp_rencana_kerja',
    timestamps: false
});
export {
    tempRencanaKerja
}