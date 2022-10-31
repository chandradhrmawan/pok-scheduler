/* eslint new-cap: "off", global-require: "off" */
import { Sequelize } from "sequelize";
import { db } from "../config/database/database.js"
const dLembarKontrolPenRo = db.define('dLembarKontrolPenRo', {
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
    NAMA_RINCIAN_OUTPUT: {
        type: Sequelize.STRING(100),
        field: 'NAMA_RINCIAN_OUTPUT',
        allowNull: true
    },
    SATUAN: {
        type: Sequelize.STRING(100),
        field: 'SATUAN',
        allowNull: true
    },
    AWAL_VOL: {
        type: Sequelize.NUMBER,
        field: 'AWAL_VOL',
        allowNull: true
    },
    AWAL_RPM: {
        type: Sequelize.NUMBER,
        field: 'AWAL_RPM',
        allowNull: true
    },
    AWAL_PHLN: {
        type: Sequelize.NUMBER,
        field: 'AWAL_PHLN',
        allowNull: true
    },
    AWAL_BLOKIR: {
        type: Sequelize.NUMBER,
        field: 'AWAL_BLOKIR',
        allowNull: true
    },
    AWAL_SBSN: {
        type: Sequelize.NUMBER,
        field: 'AWAL_SBSN',
        allowNull: true
    },
    AWAL_JUMLAH: {
        type: Sequelize.NUMBER,
        field: 'AWAL_JUMLAH',
        allowNull: true
    },
    REVISI_1_VOL: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_VOL',
        allowNull: true
    },
    REVISI_1_RPM: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_RPM',
        allowNull: true
    },
    REVISI_1_PHLN: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_PHLN',
        allowNull: true
    },
    REVISI_1_BLOKIR: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_BLOKIR',
        allowNull: true
    },
    REVISI_1_SBSN: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_SBSN',
        allowNull: true
    },
    REVISI_1_JUMLAH: {
        type: Sequelize.NUMBER,
        field: 'REVISI_1_JUMLAH',
        allowNull: true
    },
    AKHIR_VOL: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_VOL',
        allowNull: true
    },
    AKHIR_RPM: {
        type: Sequelize.NUMBER,
        field: 'AKHIR_RPM',
        allowNull: true
    },
    AKHIR_PHLN: {
        type: Sequelize.STRING,
        field: 'AKHIR_PHLN',
        allowNull: true
    },
    AKHIR_BLOKIR: {
        type: Sequelize.STRING,
        field: 'AKHIR_BLOKIR',
        allowNull: true
    },
    AKHIR_SBSN: {
        type: Sequelize.STRING,
        field: 'AKHIR_SBSN',
        allowNull: true
    },
    AKHIR_JUMLAH: {
        type: Sequelize.STRING,
        field: 'AKHIR_JUMLAH',
        allowNull: true
    },
    AKHIR_JUMLAH: {
        type: Sequelize.STRING,
        field: 'AKHIR_JUMLAH',
        allowNull: true
    },
    AKHIR_JUMLAH: {
        type: Sequelize.STRING,
        field: 'AKHIR_JUMLAH',
        allowNull: true
    },
    KETERANGAN: {
        type: Sequelize.STRING,
        field: 'KETERANGAN',
        allowNull: true
    },
    PERIODE: {
        type: Sequelize.STRING,
        field: 'PERIODE',
        allowNull: true
    }
}, {
    tableName: 'd_lembar_kontrol_1_pen_ro',
    timestamps: false
});
export {
    dLembarKontrolPenRo
}