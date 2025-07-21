// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

//test DB connection on startup
(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  } catch (err) {
    console.error('Failed to connect to PostgreSQL:', err.message);
    process.exit(1); // exit if and when DB connection fails
  }
})();

module.exports = pool;
