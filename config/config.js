const mongoose = require("mongoose")

require("dotenv").config()
const DATABASE_URL = process.env.DATABASE_URL

const DBconnect = async ()=>{

   const response = await mongoose.connect(DATABASE_URL)
   .then(()=>{
    console.log("DB connection successfull.")
   })
   .catch((error)=>{
    console.log(error)
    console.log(" DB Connection failed")
   })
   console.log(DATABASE_URL)
}

module.exports = DBconnect