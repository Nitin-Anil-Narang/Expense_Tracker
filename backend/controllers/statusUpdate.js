const expenseModel = require("../model/statusUpdate");

const updateExpenseStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await expenseModel.updateStatusById(id, status);
    res.status(200).json({ message: "Status updated" });
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

module.exports = {
  updateExpenseStatus,
};
