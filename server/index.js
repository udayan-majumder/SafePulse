const express = require("express");
const app = express();
const cors = require("cors");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require('./routes/loginRoute')
const GetLoginDetails = require('./routes/getdetailsRoute')
const SendSosTrigger = require('./routes/usersostrigger')
const cookieParser = require('cookie-parser')
require("dotenv").config();

const port = process.env.PORT;

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


 
app.use("/user", registerRoute);
app.use('/user',loginRoute);
app.use('/user',GetLoginDetails)
app.use("/user", SendSosTrigger);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
