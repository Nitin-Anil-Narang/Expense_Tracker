const db = require('../DB/connect');


const findUserByEmail = async (email) => {
  const rows = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows.rows;
};





module.exports = { findUserByEmail};
