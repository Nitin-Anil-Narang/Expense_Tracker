const expenseModel = require('../model/expenseCreation');

const createExpense = async (req, res) => {
  try {
    
    const { category, notes, date, amount } = req.body;
    

    if (!category || !date || !amount ) {
      return res.status(400).json({ message: "Category, date, and amount are required." });
    }

    const expense = await expenseModel.createExpense({ category, notes, date, amount});
    res.status(201).json({ message: "Expense created successfully", data: expense });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.getAllExpenses();
    res.status(200).json({ data: expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createExpense,getAllExpenses
};
