const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 4000;

// Middleware
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Started got it")
})

const router = require("./routes/router")
//mounted the url with /api/v1
app.use('/api/v1', router)

const DBconnect = require("./config/config")
DBconnect();

app.listen(PORT, () => {
    console.log(`listning at ${PORT}`)
})
