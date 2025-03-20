const {pool} = require('../models/dbconfig')

const ActiveSosTrigger = async(req,res)=>{
try{

const {Phoneno,UserId} = req.user
const {Latitude,Longitude} = req.body

const response = await pool.query('select * from user_sos_location where userid=$1',[UserId])
if(!response.rows.length){
    const sosResponse = await pool.query('insert into user_sos_location values($1,$2,$3,$4)',[UserId,Phoneno,Latitude,Longitude])
}
else if(response.rows.length){
      const sosResponse = await pool.query(
        "UPDATE user_sos_location SET phoneno=$1, latitude=$2, longitude=$3 WHERE userid=$4",
        [Phoneno, Latitude, Longitude,UserId]
      );
}


  return res.status(200).json({
    status: true,
    message: "SOS Triggered",
  });
}
catch(err){
    console.log(err)
}




}
module.exports = {ActiveSosTrigger}