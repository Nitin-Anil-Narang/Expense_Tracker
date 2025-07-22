const db = require('../DB/connect');

const insertLog = async ({
  event,
  actor_id,
  actor_role,
  target_table,
  target_id,
  action_result,
  description
}) => {
  const query = `
    INSERT INTO logs (
      event, actor_id, actor_role,
      target_table, target_id,
      action_result, description
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const values = [
    event,
    actor_id,
    actor_role,
    target_table,
    target_id,
    action_result,
    description
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

const getAllLogs = async () => {
    const result = await db.query("SELECT * FROM logs ");
    return result.rows;
  }

module.exports = {
  insertLog,getAllLogs
};
