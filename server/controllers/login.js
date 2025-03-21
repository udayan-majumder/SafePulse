const { pool } = require("../models/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const LoginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const Userquery = await pool.query(
      "select * from userdetails where Email= $1",
      [Email]
    );
   
    if(Userquery){
     const Hashpassword = Userquery.rows[0].password;
     const Username = Userquery.rows[0].username;
     const userid = Userquery.rows[0].userid;
     const phoneno = Userquery.rows[0].phone_no;
     const PassCheck = await bcrypt.compare(Password, Hashpassword);

     if (PassCheck) {
       const assigntoken = jwt.sign(
         { UserId: userid, Username: Username, Email: Email, Phoneno: phoneno },
         process.env.JWT_SECRET_KEY
       );

       res.cookie("token", assigntoken, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
       });

       return res.json({ message: "UserLoggedIn" });
     } 
  
    }
   
      return res.json({ message: "Wrong Username or Password" });
    
  } catch(err) {
    console.log(err);
  }
};

module.exports = { LoginUser };