import dotenv from "dotenv";
import { Sequelize, QueryTypes } from "sequelize";
dotenv.config();

const db = new Sequelize(`${process.env.DB_SCEM}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
    host: `${process.env.DB_HOST}`,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 200,
        min: 0,
        idle: 10000,
        acquire: 150000,
    },
});

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export {
    db,
    QueryTypes
}
