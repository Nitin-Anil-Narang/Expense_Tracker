const db = require("../DB/connect"); 

const updateStatusById = async (id, status) => {
  const query = `
    UPDATE expense_receipt
    SET status = $1,
        updatedAt = NOW()
    WHERE expense_id = $2
  `;
  await db.query(query, [status, id]);
};

module.exports = {
  updateStatusById,
};