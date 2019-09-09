require('dotenv').config();
const pg = require('pg');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });


// pool.query('SELECT * FROM snippet')
//   .then(result => {
//     console.table(result.rows);
//   }).catch(err => console.error(err))
//   .finally(() => pool.end());

module.exports = pool;