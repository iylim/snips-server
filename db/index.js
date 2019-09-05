require('dotenv').config();
const pg = require('pg');

const { DB_HOST, DB_PASSWORD, DB_USER, DB_PORT, DB_DATABASE, DATABASE_URL } = process.env;

// const connectionString = (`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);
const connectionString = (`${DATABASE_URL}`);
const pool = new pg.Pool({ connectionString });


// pool.query('SELECT * FROM snippet')
//   .then(result => {
//     console.table(result.rows);
//   }).catch(err => console.error(err))
//   .finally(() => pool.end());

module.exports = pool;