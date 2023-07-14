const mysql = require("mysql2/promise");
const { createClient } = require("redis");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "ThanhDatMobile",
    password: process.env.MYSQL_PASSWORD,
});

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

module.exports = { pool, client };
