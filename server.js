const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT ||4000;

//parser middleware
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Started got it")
})

app.listen(PORT,()=>{
    console.log(`listning at ${PORT}`)
})

const router = require("./routes/router")
//mounted the url with /api/v1
app.use('/api/v1',router)

const DBconnect = require("./config/config")
DBconnect();
