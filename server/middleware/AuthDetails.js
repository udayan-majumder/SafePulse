const jwt = require("jsonwebtoken");
require("dotenv").config();

// const AuthUserDetails = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if (token) {
//       const VerifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//       if (VerifyToken) {
//         req.user = VerifyToken;
//         return next();
//       }
//     }
  
//     return res.status(400).json({"message":"Not Authorized"})

//   } catch (err) {
//     console.log(err);
//   }
// };

const AuthUserDetails = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "Not Authorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
  
    next();

  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { AuthUserDetails };
