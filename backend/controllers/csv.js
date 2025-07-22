const convertToCSV = require('../csv');
const logModel = require('../model/log');
const expenseModel = require('../model/expenseCreation');


const logCSV = async (req, res) => {
  try {
    const data = await logModel.getAllLogs(); 
    const csv = convertToCSV(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('log.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to generate CSV');
  }
};

const expenseCSV = async (req, res) => {
  try {
    const data = await expenseModel.getAllExpenses();
    const csv = convertToCSV(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('expense.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to generate CSV');
  }
};

module.exports = {logCSV,expenseCSV}
