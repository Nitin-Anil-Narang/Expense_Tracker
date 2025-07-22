const signupModel  = require('../model/signUp')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
  try {
    const { name,email,confirmPassword } = req.body; 
    

    const userExists = await signupModel.getEmail(
      email
    );
    if (userExists.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    
    

    const hashedPassword = await bcrypt.hash(confirmPassword, 10);
    
     const token = jwt.sign(
      {
        email: email,
        role: 'unassigned'
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const newUser = await signupModel.createUser(name,email,hashedPassword);

    res.status(201).json({ success: true, data: newUser,token:token });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { signup }