/* eslint new-cap: "off", global-require: "off" */
import { Sequelize } from "sequelize";
import { db } from "../config/database/database.js"
const trBmData = db.define('trBmData', {
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
    NOPROP1: {
        type: Sequelize.STRING,
        field: 'NOPROP1',
        allowNull: true,
    },
    NORUAS: {
        type: Sequelize.STRING,
        field: 'NORUAS',
        allowNull: true,
    },
    NOMOR: {
        type: Sequelize.STRING,
        field: 'NOMOR',
        allowNull: true,
    },
    NOMOR1: {
        type: Sequelize.STRING,
        field: 'NOMOR1',
        allowNull: true,
    },
    SUFFIX: {
        type: Sequelize.STRING,
        field: 'SUFFIX',
        allowNull: true,
    },
    NAMA: {
        type: Sequelize.STRING,
        field: 'NAMA',
        allowNull: true,
    },
    CADIN: {
        type: Sequelize.STRING,
        field: 'CADIN',
        allowNull: true,
    },
    DARI: {
        type: Sequelize.STRING,
        field: 'DARI',
        allowNull: true,
    },
    KM: {
        type: Sequelize.NUMBER,
        field: 'KM',
        allowNull: true,
    },
    ID_JBTN: {
        type: Sequelize.STRING,
        field: 'ID_JBTN',
        allowNull: true,
    },
    PENGELOLA: {
        type: Sequelize.STRING,
        field: 'PENGELOLA',
        allowNull: true,
    },
    PROVINSI: {
        type: Sequelize.STRING,
        field: 'PROVINSI',
        allowNull: true,
    },
    LINTAS: {
        type: Sequelize.STRING,
        field: 'LINTAS',
        allowNull: true,
    },
    JUMBEN: {
        type: Sequelize.NUMBER,
        field: 'JUMBEN',
        allowNull: true,
    },
    PANJANG: {
        type: Sequelize.NUMBER,
        field: 'PANJANG',
        allowNull: true,
    },
    WIDTH: {
        type: Sequelize.NUMBER,
        field: 'WIDTH',
        allowNull: true,
    },
    TAHUN: {
        type: Sequelize.STRING,
        field: 'TAHUN',
        allowNull: true,
    },
    LATITUDE: {
        type: Sequelize.STRING,
        field: 'LATITUDE',
        allowNull: true,
    },
    Y_AWAL: {
        type: Sequelize.STRING,
        field: 'Y_AWAL',
        allowNull: true,
    },
    LONGITUDE: {
        type: Sequelize.STRING,
        field: 'LONGITUDE',
        allowNull: true,
    },
    X_AWAL: {
        type: Sequelize.STRING,
        field: 'X_AWAL',
        allowNull: true,
    },
    TIPE: {
        type: Sequelize.STRING,
        field: 'TIPE',
        allowNull: true,
    },
}, {
    tableName: 'tr_bmdata',
    timestamps: false
});
trBmData.removeAttribute('id');
export {
    trBmData
}