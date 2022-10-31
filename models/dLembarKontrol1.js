/* eslint new-cap: "off", global-require: "off" */
import { Sequelize } from "sequelize";
import { db } from "../config/database/database.js"
const dLembarKontrol1 = db.define('dLembarKontrol1', {
    POK_UID: {
        type: Sequelize.STRING(100),
        field: 'POK_UID',
        allowNull: true
    },
    D_POK_REVISION_UID: {
        type: Sequelize.STRING(100),
        field: 'D_POK_REVISION_UID',
        allowNull: true
    },
    STATUS: {
        type: Sequelize.STRING(100),
        field: 'STATUS',
        allowNull: true
    },
    KDSATKER: {
        type: Sequelize.STRING(100),
        field: 'KDSATKER',
        allowNull: true
    },
    NMSATKER: {
        type: Sequelize.STRING(100),
        field: 'NMSATKER',
        allowNull: true
    },
    NMLOKASI: {
        type: Sequelize.STRING(100),
        field: 'NMLOKASI',
        allowNull: true
    },
    PROGRAM: {
        type: Sequelize.STRING(100),
        field: 'PROGRAM',
        allowNull: true
    },
    NO_TGL_SP_DIPA: {
        type: Sequelize.STRING(100),
        field: 'NO_TGL_SP_DIPA',
        allowNull: true
    },
    THANG: {
        type: Sequelize.STRING(100),
        field: 'THANG',
        allowNull: true
    },
    NAMA_RINCIAN_OUTPUT: {
        type: Sequelize.STRING(100),
        field: 'NAMA_RINCIAN_OUTPUT',
        allowNull: true
    },
    NOMOR: {
        type: Sequelize.STRING(100),
        field: 'NOMOR',
        allowNull: true
    },
    AWAL_BLNJ_PEG_OP: {
        type: Sequelize.NUMBER,
        field: 'AWAL_BLNJ_PEG_OP',
        allowNull: true
    },
    AWAL_BRG_RM: {
        type: Sequelize.NUMBER,
        field: 'AWAL_BRG_RM',
        allowNull: true
    },
    AWAL_BRG_NON_OPR: {
        type: Sequelize.NUMBER,
        field: 'AWAL_BRG_NON_OPR',
        allowNull: true
    },
    AWAL_BRG_SBSN: {
        type: Sequelize.NUMBER,
        field: 'AWAL_BRG_SBSN',
        allowNull: true
    },
    AWAL_MDL_RM: {
        type: Sequelize.NUMBER,
        field: 'AWAL_MDL_RM',
        allowNull: true
    },
    AWAL_MDL_NON_OPR: {
        type: Sequelize.NUMBER,
        field: 'AWAL_MDL_NON_OPR',
        allowNull: true
    },
    AWAL_MDL_SBSN: {
        type: Sequelize.NUMBER,
        field: 'AWAL_MDL_SBSN',
        allowNull: true
    },
    AWAL_JUMLAH: {
        type: Sequelize.NUMBER,
        field: 'AWAL_JUMLAH',
        allowNull: true
    },
    REVISI_1_BLNJ_PEG_OP: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_BLNJ_PEG_OP',
        allowNull: true
    },
    REVISI_1_BRG_RM: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_BRG_RM',
        allowNull: true
    },
    REVISI_1_BRG_NON_OPR: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_BRG_NON_OPR',
        allowNull: true
    },
    REVISI_1_BRG_SBSN: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_BRG_SBSN',
        allowNull: true
    },
    REVISI_1_MDL_RM: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_MDL_RM',
        allowNull: true
    },
    REVISI_1_MDL_NON_OPR: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_MDL_NON_OPR',
        allowNull: true
    },
    REVISI_1_MDL_SBSN: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_MDL_SBSN',
        allowNull: true
    },
    REVISI_1_JUMLAH: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_JUMLAH',
        allowNull: true
    },
    AKHIR_BLNJ_PEG_OP: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_BLNJ_PEG_OP',
        allowNull: true
    },
    AKHIR_BRG_RM: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_BRG_RM',
        allowNull: true
    },
    AKHIR_BRG_NON_OPR: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_BRG_NON_OPR',
        allowNull: true
    },
    AKHIR_BRG_SBSN: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_BRG_SBSN',
        allowNull: true
    },
    AKHIR_MDL_RM: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_MDL_RM',
        allowNull: true
    },
    AKHIR_MDL_NON_OPR: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_MDL_NON_OPR',
        allowNull: true
    },
    AKHIR_MDL_SBSN: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_MDL_SBSN',
        allowNull: true
    },
    AKHIR_JUMLAH: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_JUMLAH',
        allowNull: true
    },
    KETERANGAN: {
        type: Sequelize.STRING,
        field: 'KETERANGAN',
        allowNull: true
    },
    SORT: {
        type: Sequelize.STRING,
        field: 'SORT',
        allowNull: true
    },
    PERIODE: {
        type: Sequelize.STRING,
        field: 'PERIODE',
        allowNull: true
    }
}, {
    tableName: 'd_lembar_kontrol_1',
    timestamps: false
});
dLembarKontrol1.removeAttribute('id');
export {
    dLembarKontrol1
}