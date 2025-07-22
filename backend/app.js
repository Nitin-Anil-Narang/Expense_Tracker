const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import for Admin Api
const assignRole = require('./routes/RoleAssign')
const updateStatus = require('./routes/statusUpdate')
const csvExport = require("./routes/csv")

// Common Imports and Api for Employee
const signup = require('./routes/signUp')
const login = require('./routes/login')
const logs = require('./routes/log')
const createExp = require('./routes/expenseCreation')

const test = require("./routes/inital_test")

const app = express();
const port = process.env.PORT;


//
app.use(cors({
  origin: process.env.FRONTEND_URL || ["http://localhost:5173"],
  credentials: true
}));
app.use(express.json());



// Api for Admin
app.use('/',assignRole);
app.use('/',updateStatus);
app.use('/',logs);
app.use('/',csvExport)

// Common Api and Api for Employee
app.use('/',signup);
app.use('/',login);
app.use('/',createExp);

//Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});