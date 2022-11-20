/* eslint new-cap: "off", global-require: "off" */
import { Sequelize } from "sequelize";
import { db } from "../config/database/database.js"
const trLinkDesc = db.define('trLinkDesc', {
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
    NOPROP: {
        type: Sequelize.STRING,
        field: 'NOPROP',
        allowNull: true,
    },
    LINKID: {
        type: Sequelize.STRING,
        field: 'LINKID',
        allowNull: true,
    },
    LINKID1: {
        type: Sequelize.STRING,
        field: 'LINKID1',
        allowNull: true,
    },
    NORUAS: {
        type: Sequelize.STRING,
        field: 'NORUAS',
        allowNull: true,
    },
    FLAGRUAS: {
        type: Sequelize.STRING,
        field: 'FLAGRUAS',
        allowNull: true,
    },
    RUAS: {
        type: Sequelize.STRING,
        field: 'RUAS',
        allowNull: true,
    },
    SFFX: {
        type: Sequelize.STRING,
        field: 'SFFX',
        allowNull: true,
    },
    KOTA: {
        type: Sequelize.STRING,
        field: 'KOTA',
        allowNull: true,
    },
    RUAS1: {
        type: Sequelize.STRING,
        field: 'RUAS1',
        allowNull: true,
    },
    SFFX1: {
        type: Sequelize.STRING,
        field: 'SFFX1',
        allowNull: true,
    },
    KOTA1: {
        type: Sequelize.STRING,
        field: 'KOTA1',
        allowNull: true,
    },
    LINKNAME: {
        type: Sequelize.STRING,
        field: 'LINKNAME',
        allowNull: true,
    },
    NMRUAS: {
        type: Sequelize.STRING,
        field: 'NMRUAS',
        allowNull: true,
    },
    KABKOTA: {
        type: Sequelize.STRING,
        field: 'KABKOTA',
        allowNull: true,
    },
    PJG_SUR: {
        type: Sequelize.NUMBER,
        field: 'PJG_SUR',
        allowNull: true,
    },
    LENGTH: {
        type: Sequelize.NUMBER,
        field: 'LENGTH',
        allowNull: true,
    },
    SK_LENGTH: {
        type: Sequelize.NUMBER,
        field: 'SK_LENGTH',
        allowNull: true,
    },
    LEBAR: {
        type: Sequelize.NUMBER,
        field: 'LEBAR',
        allowNull: true,
    },
    FRORGN: {
        type: Sequelize.STRING,
        field: 'FRORGN',
        allowNull: true,
    },
    TOORGN: {
        type: Sequelize.STRING,
        field: 'TOORGN',
        allowNull: true,
    },
    KPFROM: {
        type: Sequelize.NUMBER,
        field: 'KPFROM',
        allowNull: true,
    },
    KPTO: {
        type: Sequelize.NUMBER,
        field: 'KPTO',
        allowNull: true,
    },
    STATUS: {
        type: Sequelize.STRING,
        field: 'STATUS',
        allowNull: true,
    },
    LINTAS: {
        type: Sequelize.STRING,
        field: 'LINTAS',
        allowNull: true,
    },
    FCTCLASS: {
        type: Sequelize.STRING,
        field: 'FCTCLASS',
        allowNull: true,
    },
    ADMCLASS: {
        type: Sequelize.STRING,
        field: 'ADMCLASS',
        allowNull: true,
    },
    X_AWAL: {
        type: Sequelize.STRING,
        field: 'X_AWAL',
        allowNull: true,
    },
    Y_AWAL: {
        type: Sequelize.STRING,
        field: 'Y_AWAL',
        allowNull: true,
    },
    X_AKHIR: {
        type: Sequelize.STRING,
        field: 'X_AKHIR',
        allowNull: true,
    },
    Y_AKHIR: {
        type: Sequelize.STRING,
        field: 'Y_AKHIR',
        allowNull: true,
    },
    ID_AWAL: {
        type: Sequelize.STRING,
        field: 'ID_AWAL',
        allowNull: true,
    },
    ID_AKHIR: {
        type: Sequelize.STRING,
        field: 'ID_AKHIR',
        allowNull: true,
    },
    LENGTH15: {
        type: Sequelize.NUMBER,
        field: 'LENGTH15',
        allowNull: true,
    },
}, {
    tableName: 'tr_linkdesc',
    timestamps: false
});
trLinkDesc.removeAttribute('id');
export {
    trLinkDesc
} 