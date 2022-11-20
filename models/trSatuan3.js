/* eslint new-cap: "off", global-require: "off" */
import { Sequelize } from "sequelize";
import { db } from "../config/database/database.js"
const trSatuan3 = db.define('trSatuan3', {
    UID: {
        type: Sequelize.STRING,
        field: 'UID',
        allowNull: false,
        primaryKey: true
    },
    ACTIVE_IND: {
        type: Sequelize.STRING,
        field: 'ACTIVE_IND',
        allowNull: true
    },
    LVL: {
        type: Sequelize.STRING,
        field: 'LVL',
        allowNull: true
    },
    THANG: {
        type: Sequelize.STRING,
        field: 'THANG',
        allowNull: true,
    },
    KDINDUK: {
        type: Sequelize.STRING,
        field: 'KDINDUK',
        allowNull: true,
    },
    KDSATKER: {
        type: Sequelize.STRING,
        field: 'KDSATKER',
        allowNull: true,
    },
    KDPROGRAM: {
        type: Sequelize.STRING,
        field: 'KDPROGRAM',
        allowNull: true,
    },
    KDGIAT: {
        type: Sequelize.STRING,
        field: 'KDGIAT',
        allowNull: true,
    },
    KDOUTPUT: {
        type: Sequelize.STRING,
        field: 'KDOUTPUT',
        allowNull: true,
    },
    KDSOUTPUT: {
        type: Sequelize.STRING,
        field: 'KDSOUTPUT',
        allowNull: true,
    },
    KDKMPNEN: {
        type: Sequelize.STRING,
        field: 'KDKMPNEN',
        allowNull: true,
    },
    KDSKMPNEN: {
        type: Sequelize.STRING,
        field: 'KDSKMPNEN',
        allowNull: true,
    },
    KDAKUN: {
        type: Sequelize.STRING,
        field: 'KDAKUN',
        allowNull: true,
    },
    KDKPPN: {
        type: Sequelize.STRING,
        field: 'KDKPPN',
        allowNull: true,
    },
    KDBEBAN: {
        type: Sequelize.STRING,
        field: 'KDBEBAN',
        allowNull: true,
    },
    KDJNSBAN: {
        type: Sequelize.STRING,
        field: 'KDJNSBAN',
        allowNull: true,
    },
    REGISTER: {
        type: Sequelize.STRING,
        field: 'REGISTER',
        allowNull: true,
    },
    NOITEM: {
        type: Sequelize.NUMBER,
        field: 'NOITEM',
        allowNull: true,
    },
    DESK: {
        type: Sequelize.STRING,
        field: 'DESK',
        allowNull: true,
    },
    VOLKEG: {
        type: Sequelize.NUMBER,
        field: 'VOLKEG',
        allowNull: true,
    },
    SATKEG: {
        type: Sequelize.STRING,
        field: 'SATKEG',
        allowNull: true,
    },
    SATUAN: {
        type: Sequelize.STRING,
        field: 'SATUAN',
        allowNull: true,
    },
    KET: {
        type: Sequelize.STRING,
        field: 'KET',
        allowNull: true,
    },
    HARGASAT: {
        type: Sequelize.NUMBER,
        field: 'HARGASAT',
        allowNull: true,
    },
    HARGASAT1: {
        type: Sequelize.NUMBER,
        field: 'HARGASAT1',
        allowNull: true,
    },
    LENGTH: {
        type: Sequelize.NUMBER,
        field: 'LENGTH',
        allowNull: true,
    },
    MURNI: {
        type: Sequelize.NUMBER,
        field: 'MURNI',
        allowNull: true,
    },
    PHLN: {
        type: Sequelize.NUMBER,
        field: 'PHLN',
        allowNull: true,
    },
    JUMLAH: {
        type: Sequelize.NUMBER,
        field: 'JUMLAH',
        allowNull: true,
    },
    JUMLAH1: {
        type: Sequelize.NUMBER,
        field: 'JUMLAH1',
        allowNull: true,
    },
    JUMLAH2: {
        type: Sequelize.NUMBER,
        field: 'JUMLAH2',
        allowNull: true,
    },
    PAGUPHLN: {
        type: Sequelize.NUMBER,
        field: 'PAGUPHLN',
        allowNull: true,
    },
    PAGURMP: {
        type: Sequelize.NUMBER,
        field: 'PAGURMP',
        allowNull: true,
    },
    PAGURKP: {
        type: Sequelize.NUMBER,
        field: 'PAGURKP',
        allowNull: true,
    },
    KDIKAT: {
        type: Sequelize.STRING,
        field: 'KDIKAT',
        allowNull: true,
    },
    JMLIKAT: {
        type: Sequelize.NUMBER,
        field: 'JMLIKAT',
        allowNull: true,
    },
    JMLPDP: {
        type: Sequelize.NUMBER,
        field: 'JMLPDP',
        allowNull: true,
    },
    JMLNPDP: {
        type: Sequelize.NUMBER,
        field: 'JMLNPDP',
        allowNull: true,
    },
    JMLPLN: {
        type: Sequelize.NUMBER,
        field: 'JMLPLN',
        allowNull: true,
    },
    JMLHIBAH: {
        type: Sequelize.NUMBER,
        field: 'JMLHIBAH',
        allowNull: true,
    },
    KDBLOKIR: {
        type: Sequelize.STRING,
        field: 'KDBLOKIR',
        allowNull: true,
    },
    BLOKIRPHLN: {
        type: Sequelize.NUMBER,
        field: 'BLOKIRPHLN',
        allowNull: true,
    },
    BLOKIRRMP: {
        type: Sequelize.NUMBER,
        field: 'BLOKIRRMP',
        allowNull: true,
    },
    BLOKIRRKP: {
        type: Sequelize.NUMBER,
        field: 'BLOKIRRKP',
        allowNull: true,
    },
    RPHBLOKIR: {
        type: Sequelize.NUMBER,
        field: 'RPHBLOKIR',
        allowNull: true,
    },
    RPHBLOKIR1: {
        type: Sequelize.NUMBER,
        field: 'RPHBLOKIR1',
        allowNull: true,
    },
    KDIB: {
        type: Sequelize.STRING,
        field: 'KDIB',
        allowNull: true,
    },
}, {
    tableName: 'tr_satuan_3',
    timestamps: false
});
trSatuan3.removeAttribute('id');
export {
    trSatuan3
}