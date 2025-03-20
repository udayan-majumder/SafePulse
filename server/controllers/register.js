const {pool} = require('../models/dbconfig')
const bcrypt = require('bcrypt')

const RegisterUser = async(req,res)=>{

const {Username,Email,Password,Phoneno} = req.body

try{
const Userquery = await pool.query("select * from userdetails where username=$1 and email=$2",[Username,Email])

if(!Userquery.rows.length){

const Hassedpassword = await bcrypt.hash(Password,10)
const Useradd = await pool.query('insert into userdetails(username,email,password,phone_no) values($1,$2,$3,$4)',[Username,Email,Hassedpassword,Phoneno])
return res.json({"message":"User added succesfully"})

}
else{
 return res.json({ message: "User already Exsist" });
}


}
catch(err){
    console.log(err)
}


}

module.exports = {RegisterUser}
