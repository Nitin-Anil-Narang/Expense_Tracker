const db = require('../DB/connect'); 

const createExpense = async ({ category, notes, date, amount }) => {
  const query = `
    INSERT INTO expense_receipt (category, notes, date, amount)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [category, notes, date, amount];

  const { rows } = await db.query(query, values);
  return rows[0];
};

const getAllExpenses = async () => {
  const query = `
    SELECT 
      expense_id, 
      category, 
      notes, 
      date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata' AS date,
      amount, 
      status, 
      createdAt AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata' AS createdAt,
      updatedAt AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata' AS updatedAt
    FROM expense_receipt
    ORDER BY createdAt DESC;
  `;
  const { rows } = await db.query(query);
  return rows;
};

module.exports = {
  createExpense,getAllExpenses
};