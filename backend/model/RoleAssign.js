const db = require('../DB/connect');

const updateRoleByEmail = async (email, newRole) => {
  const result = await db.query('UPDATE users SET role = $1 WHERE email = $2 RETURNING *', [newRole, email]);
  return result.rows;
};

const getFullPersonal = async () => {
  const rows = await db.query("SELECT * FROM users");
  
  return rows.rows;
};

const deleteUserByEmail = async (email) => {
  const query = `DELETE FROM users WHERE email = $1 RETURNING *`;

  const result = await db.query(query, [email]);

  if (result.rows.length === 0) return null;

  return result.rows[0];
};

module.exports = {getFullPersonal,updateRoleByEmail,deleteUserByEmail}