const { createPool } = require('mysql');

other = new Sequelize(`${process.env.MYSQL_DB}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: `${process.env.DB_HOST}`, //
  dialect: "mysql",
  dialectOptions: options,
  pool: poolOption,
    });

const pool = createPool({
  port: process.env.DB_PORT,
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.MYSQL_DB,
  connectionLimit:10
})

module.exports = pool;
