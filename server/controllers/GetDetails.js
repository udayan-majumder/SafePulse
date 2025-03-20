const jwt = require("jsonwebtoken");
require("dotenv").config();

const GetLoginDetails = async(req, res) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const VerifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (VerifyToken) {
       return res.json({"message":"Authorized"})
      }
    }
    else{
    return res.json({ "message": "NotAuthorized" });
    }
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = { GetLoginDetails };
