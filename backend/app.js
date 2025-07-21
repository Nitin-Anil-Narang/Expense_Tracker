const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import for Admin Api
const assignRole = require('./routes/RoleAssign')
// Import for Employee Api
// Common Imports
const signup = require('./routes/signUp')
const login = require('./routes/login')

const test = require("./routes/inital_test")

const app = express();
const port = process.env.PORT;

const frontend_url = process.env.FRONTEND_URL;
//
app.use(cors({
  origin: frontend_url,
  credentials: true
}));
app.use(express.json());

// Below api was used to initally test the DB connect and fetch data (Ignore)
// app.use('/',test); 

// Api for Admin
app.use('/',assignRole);

// Api for Employee


// Common Api
app.use('/',signup);
app.use('/',login);


//Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});